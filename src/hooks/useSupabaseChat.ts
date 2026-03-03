import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '../supabase';
import { Message } from '../types';
import { usePageVisibility } from './usePageVisibility';

const MESSAGES_PER_PAGE = 50;
const LAST_SEEN_KEY = 'chat_last_seen_timestamp';
const UNREAD_POLL_INTERVAL = 10000; // 60s polling when chat is closed

export function useSupabaseChat(isOpen: boolean, displayName: string, userId?: string, isAdmin: boolean = false) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const channelRef = useRef<any>(null);
  const isVisibleRef = useRef(true);

  // Handle page visibility changes for bfcache compatibility
  usePageVisibility((isVisible) => {
    isVisibleRef.current = isVisible;

    // Reconnect when page becomes visible again (only if chat is open)
    if (isVisible && isOpen && channelRef.current) {
      channelRef.current.subscribe();
    }
  });

  // Fetch messages & subscribe to realtime (only when chat is open)
  useEffect(() => {
    if (isOpen) {
      setLoading(true);

      const fetchMessages = async () => {
        const [chatResult, systemResult] = await Promise.all([
          supabase
            .from('chat_messages')
            .select('*')
            .order('created_at', { ascending: true })
            .limit(MESSAGES_PER_PAGE),
          supabase
            .from('system_messages')
            .select('*')
            .eq('is_active', true)
            .order('created_at', { ascending: true }),
        ]);

        const allMessages: Message[] = [];

        if (!chatResult.error && chatResult.data) {
          chatResult.data.forEach((m) => {
            allMessages.push({
              id: m.id,
              text: m.text,
              timestamp: new Date(m.created_at).getTime(),
              username: m.username,
              isAdmin: m.is_admin,
            });
          });
        }

        if (!systemResult.error && systemResult.data) {
          systemResult.data.forEach((m) => {
            allMessages.push({
              id: `system-${m.id}`,
              text: m.text,
              timestamp: new Date(m.created_at).getTime(),
              username: 'Sistema',
              isAdmin: false,
              isSystem: true,
              systemType: m.message_type,
            });
          });
        }

        allMessages.sort((a, b) => a.timestamp - b.timestamp);
        setMessages(allMessages);
        setLoading(false);
      };

      fetchMessages();

      // Mark chat as seen when opened
      localStorage.setItem(LAST_SEEN_KEY, new Date().toISOString());
      setUnreadCount(0);

      // Realtime subscription — only active while chat is open
      const channel = supabase.channel('chat-messages', {
        config: {
          broadcast: { self: false },
          presence: { key: userId },
        },
      });

      channelRef.current = channel;

      channel
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
            localStorage.setItem(LAST_SEEN_KEY, new Date().toISOString());
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
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'system_messages' },
          (payload) => {
            const m = payload.new as any;
            if (m.is_active) {
              setMessages((prev) => [
                ...prev,
                {
                  id: `system-${m.id}`,
                  text: m.text,
                  timestamp: new Date(m.created_at).getTime(),
                  username: 'Sistema',
                  isAdmin: false,
                  isSystem: true,
                  systemType: m.message_type,
                },
              ]);
              localStorage.setItem(LAST_SEEN_KEY, new Date().toISOString());
            }
          }
        )
        .on(
          'postgres_changes',
          { event: 'DELETE', schema: 'public', table: 'system_messages' },
          (payload) => {
            const deletedId = (payload.old as any).id;
            setMessages((prev) =>
              prev.filter((msg) => msg.id !== `system-${deletedId}`)
            );
          }
        )
        .on(
          'postgres_changes',
          { event: 'UPDATE', schema: 'public', table: 'system_messages' },
          (payload) => {
            const m = payload.new as any;
            if (!m.is_active) {
              setMessages((prev) =>
                prev.filter((msg) => msg.id !== `system-${m.id}`)
              );
            }
          }
        )
        .subscribe();

      return () => {
        localStorage.setItem(LAST_SEEN_KEY, new Date().toISOString());
        if (channelRef.current) {
          supabase.removeChannel(channelRef.current);
          channelRef.current = null;
        }
      };
    } else {
      // Chat is closed — use polling instead of a persistent WebSocket
      // This fixes the bfcache block reported by Lighthouse
      const fetchUnread = async () => {
        const lastSeen = localStorage.getItem(LAST_SEEN_KEY);
        const cutoffTime =
          lastSeen || new Date(Date.now() - 300000).toISOString();

        const { count } = await supabase
          .from('chat_messages')
          .select('*', { count: 'exact', head: true })
          .gt('created_at', cutoffTime);

        setUnreadCount(count ?? 0);
      };

      fetchUnread();
      const interval = setInterval(fetchUnread, UNREAD_POLL_INTERVAL);

      return () => clearInterval(interval); // no open connections = bfcache works
    }
  }, [isOpen, userId]);

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
