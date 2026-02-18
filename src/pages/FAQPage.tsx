import React from 'react';
import { motion } from 'framer-motion';
import FAQ from '../components/FAQ';

interface FAQPageProps {
  darkMode: boolean;
}

const FAQPage: React.FC<FAQPageProps> = ({ darkMode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <FAQ darkMode={darkMode} />
    </motion.div>
  );
};

export default FAQPage;
