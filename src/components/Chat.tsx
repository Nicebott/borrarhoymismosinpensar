import React, { useState, useEffect } from 'react';
import { MessageCircle, X, LogIn } from 'lucide-react';
import { useSupabaseChat } from '../hooks/useSupabaseChat';
import { useAuth } from '../hooks/useAuth';
import ChatMessages from './Chat/ChatMessages';
import ChatInput from './Chat/ChatInput';
import ChatEntrance from './Chat/ChatEntrance';
import { supabase } from '../supabase';
import { checkIsAdmin, checkIsSuperAdmin } from '../services/adminService';

interface ChatProps {
  darkMode?: boolean;
  onOpenAuth?: () => void;
}

const Chat: React.FC<ChatProps> = ({ darkMode = false, onOpenAuth }) => {
  const { user, session, loading: authLoading } = useAuth();
  const [displayName, setDisplayName] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [hasEnteredChat, setHasEnteredChat] = useState(false);

  const {
    messages,
    loading,
    unreadCount,
    sendMessage,
    loadMoreMessages,
    deleteMessage,
  } = useSupabaseChat(isChatOpen, displayName, user?.id, isAdmin);

  useEffect(() => {
    const chatEntered = localStorage.getItem('chatEntered');
    if (chatEntered === 'true') {
      setHasEnteredChat(true);
    }
  }, []);

  useEffect(() => {
    if (user && session) {
      const fetchProfile = async () => {
        const { data } = await supabase
          .from('profiles')
          .select('display_name')
          .eq('id', user.id)
          .maybeSingle();

        if (data?.display_name) {
          setDisplayName(data.display_name);
        }
      };

      fetchProfile();

      const checkAdminStatus = async () => {
        const isAdminUser = await checkIsAdmin(user.id);
        const isSuperAdminUser = await checkIsSuperAdmin(user.id);
        setIsAdmin(isAdminUser || isSuperAdminUser);
      };

      checkAdminStatus();
    } else {
      setHasEnteredChat(false);
      localStorage.removeItem('chatEntered');
    }
  }, [user, session]);

  const handleSendMessage = async (text: string) => {
    const success = await sendMessage(text);
    if (!success) {
      alert('Error al enviar el mensaje. Por favor, intenta de nuevo.');
    }
  };

  const handleDeleteMessage = async (messageId: string) => {
    if (isAdmin) {
      const success = await deleteMessage(messageId);
      if (!success) {
        alert('Error al eliminar el mensaje. Por favor, intenta de nuevo.');
      }
    }
  };

  const handleEnterChat = () => {
    setHasEnteredChat(true);
    localStorage.setItem('chatEntered', 'true');
  };

  const handleOpenAuth = () => {
    setIsChatOpen(false);
    if (onOpenAuth) {
      onOpenAuth();
    }
  };

  return (
    <>
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors z-[60] flex items-center md:p-3 p-2"
      >
        <MessageCircle className="md:w-6 md:h-6 w-5 h-5" />
        {!isChatOpen && unreadCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full md:w-6 md:h-6 w-5 h-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {isChatOpen && (
        <div className={`fixed inset-x-4 bottom-20 md:bottom-20 md:right-4 md:left-auto md:w-96 shadow-lg rounded-lg z-[60] ${
          darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'
        }`}>
          <div className={`flex justify-between items-center p-3 md:p-4 border-b ${
            darkMode ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <h2 className={`text-base md:text-lg font-bold ${darkMode ? 'text-white' : ''}`}>
              Chat en tiempo real
            </h2>
            <button 
              onClick={() => setIsChatOpen(false)}
              className={`${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <X className="w-5 h-5 md:w-5 md:h-5" />
            </button>
          </div>

          <div className="p-3 md:p-4">
            {authLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            ) : !user || !session ? (
              <div className="space-y-6">
                <div className="text-center">
                  <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                    darkMode ? 'bg-gray-700' : 'bg-blue-50'
                  }`}>
                    <MessageCircle className={`w-8 h-8 ${
                      darkMode ? 'text-blue-400' : 'text-blue-500'
                    }`} />
                  </div>
                  <h3 className={`text-xl font-bold mb-2 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Chat en Tiempo Real
                  </h3>
                  <p className={`text-xs md:text-sm ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Inicia sesion para unirte a la conversacion
                  </p>
                </div>

                <button
                  onClick={handleOpenAuth}
                  className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors text-sm ${
                    darkMode
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-blue-500 hover:bg-blue-600 text-white'
                  }`}
                >
                  <LogIn size={18} />
                  <span>Iniciar Sesion</span>
                </button>
              </div>
            ) : !hasEnteredChat ? (
              <ChatEntrance darkMode={darkMode} onEnter={handleEnterChat} />
            ) : (
              <>
                {isAdmin && (
                  <div className={`mb-4 p-2 rounded-lg flex items-center justify-center ${
                    darkMode ? 'bg-yellow-900/30 border border-yellow-700' : 'bg-yellow-50 border border-yellow-200'
                  }`}>
                    <span className={`text-xs font-semibold ${
                      darkMode ? 'text-yellow-300' : 'text-yellow-700'
                    }`}>
                      Modo Administrador Activo
                    </span>
                  </div>
                )}

                <ChatMessages
                  messages={messages}
                  darkMode={darkMode}
                  currentUsername={displayName}
                  onLoadMore={loadMoreMessages}
                  loading={loading}
                  isAdmin={isAdmin}
                  onDeleteMessage={handleDeleteMessage}
                />
                <ChatInput
                  onSendMessage={handleSendMessage}
                  darkMode={darkMode}
                  username={displayName}
                />
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Chat;
