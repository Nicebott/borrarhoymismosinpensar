import React from 'react';
import { motion } from 'framer-motion';
import Forum from '../components/Forum/Forum';

interface ForumPageProps {
  darkMode: boolean;
  onOpenAuth: () => void;
}

const ForumPage: React.FC<ForumPageProps> = ({ darkMode, onOpenAuth }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <Forum darkMode={darkMode} setIsAuthModalOpen={onOpenAuth} />
    </motion.div>
  );
};

export default ForumPage;
