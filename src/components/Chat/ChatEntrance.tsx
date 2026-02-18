import React, { useState } from 'react';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import CommunityRulesModal from './CommunityRulesModal';

interface ChatEntranceProps {
  darkMode: boolean;
  onEnter: () => void;
}

const ChatEntrance: React.FC<ChatEntranceProps> = ({ darkMode, onEnter }) => {
  const [showRulesModal, setShowRulesModal] = useState(false);

  return (
    <>
      <div className="space-y-6">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
              darkMode ? 'bg-gray-700' : 'bg-blue-50'
            }`}
          >
            <MessageCircle className={`w-8 h-8 ${
              darkMode ? 'text-blue-400' : 'text-blue-500'
            }`} />
          </motion.div>
          <h3 className={`text-xl font-bold mb-2 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Chat en Tiempo Real
          </h3>
          <p className={`text-xs md:text-sm ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Unete a la conversacion con otros estudiantes
          </p>
        </div>

        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          onClick={onEnter}
          className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors text-sm ${
            darkMode
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          <span>Ingresar al chat</span>
          <ArrowRight className="w-5 h-5" />
        </motion.button>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="text-center"
        >
          <p className={`text-xs ${
            darkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            Al unirte, aceptas nuestras{' '}
            <button
              onClick={() => setShowRulesModal(true)}
              className="text-blue-500 hover:text-blue-600 underline font-medium"
            >
              normas de comunidad
            </button>
          </p>
        </motion.div>
      </div>

      <CommunityRulesModal
        isOpen={showRulesModal}
        onClose={() => setShowRulesModal(false)}
        darkMode={darkMode}
      />
    </>
  );
};

export default ChatEntrance;
