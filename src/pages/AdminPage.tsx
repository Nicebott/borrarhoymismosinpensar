import React from 'react';
import { motion } from 'framer-motion';
import AdminPanel from '../components/AdminPanel';

interface AdminPageProps {
  darkMode: boolean;
}

const AdminPage: React.FC<AdminPageProps> = ({ darkMode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <AdminPanel darkMode={darkMode} />
    </motion.div>
  );
};

export default AdminPage;
