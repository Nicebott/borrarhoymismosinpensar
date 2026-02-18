import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../supabase';
import { Message } from '../types';

const MESSAGES_PER_PAGE = 50;

export function useSupabaseChat(isOpen: boolean, displayName: string, userId?: string, isAdmin: boolean = false) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  // Fetch messages & subscribe to realtime
  useEffect(() => {
    if (isOpen) {
      setLoading(true);

      const fetchMessages = async () => {
        const { data, error } = await supabase
          .from('chat_messages')
          .select('*')
          .order('created_at', { ascending: true })
          .limit(MESSAGES_PER_PAGE);

        if (!error && data) {
          setMessages(
            data.map((m) => ({
              id: m.id,
              text: m.text,
              timestamp: new Date(m.created_at).getTime(),
              username: m.username,
              isAdmin: m.is_admin,
            }))
          );
        }
        setLoading(false);
      };

      fetchMessages();

      // Realtime subscription
      const channel = supabase
        .channel('chat-messages')
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'chat_messages' },
          (payload) => {
            const m = payload.new as any;
            setMessages((prev) => [
              ...prev,
              {
                id: m.id,
                text: m.text,
                timestamp: new Date(m.created_at).getTime(),
                username: m.username,
                isAdmin: m.is_admin,
              },
            ]);
          }
        )
        .on(
          'postgres_changes',
          { event: 'DELETE', schema: 'public', table: 'chat_messages' },
          (payload) => {
            const deletedId = (payload.old as any).id;
            setMessages((prev) => prev.filter((msg) => msg.id !== deletedId));
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    } else {
      // When chat is closed, track unread count
      const fetchUnread = async () => {
        const fiveMinAgo = new Date(Date.now() - 300000).toISOString();
        const { count } = await supabase
          .from('chat_messages')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', fiveMinAgo);

        setUnreadCount(count ?? 0);
      };

      fetchUnread();

      const channel = supabase
        .channel('chat-unread')
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'chat_messages' },
          () => {
            setUnreadCount((prev) => prev + 1);
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [isOpen]);

  const sendMessage = useCallback(
    async (text: string) => {
      try {
        const { error } = await supabase.from('chat_messages').insert({
          text,
          username: displayName,
          is_admin: isAdmin,
        });
        return !error;
      } catch {
        return false;
      }
    },
    [displayName, isAdmin]
  );

  const deleteMessage = useCallback(async (messageId: string) => {
    try {
      const { error } = await supabase
        .from('chat_messages')
        .delete()
        .eq('id', messageId);
      return !error;
    } catch {
      return false;
    }
  }, []);

  const loadMoreMessages = useCallback(async () => {
    if (messages.length === 0) return;
    const oldest = messages[0];

    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .lt('created_at', new Date(oldest.timestamp).toISOString())
      .order('created_at', { ascending: false })
      .limit(MESSAGES_PER_PAGE);

    if (!error && data && data.length > 0) {
      const older = data
        .map((m) => ({
          id: m.id,
          text: m.text,
          timestamp: new Date(m.created_at).getTime(),
          username: m.username,
          isAdmin: m.is_admin,
        }))
        .reverse();

      setMessages((prev) => [...older, ...prev]);
    }
  }, [messages]);

  return {
    messages,
    loading,
    unreadCount,
    sendMessage,
    deleteMessage,
    loadMoreMessages,
  };
}
