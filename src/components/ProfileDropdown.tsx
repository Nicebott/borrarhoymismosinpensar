import React from 'react';
import { LogOut, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabase';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

interface ProfileDropdownProps {
  darkMode: boolean;
  onClose: () => void;
  displayName?: string;
  userEmail?: string;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ darkMode, onClose, displayName, userEmail = '' }) => {

  const handleProfileClick = () => {
    onClose();
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast.success('Sesion cerrada exitosamente');
      onClose();
    } catch {
      toast.error('Error al cerrar sesion');
    }
  };

  const initials = (displayName || 'Usuario')
    .split(' ')
    .slice(0, 2)
    .map(word => word[0])
    .join('')
    .toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -10 }}
      transition={{ duration: 0.15 }}
      className={`absolute right-0 sm:right-0 mt-3 w-72 max-w-[calc(100vw-2rem)] sm:max-w-none mr-4 sm:mr-0 rounded-xl shadow-xl py-2 z-50 border ${
        darkMode
          ? 'bg-gray-800 border-gray-700'
          : 'bg-white border-gray-100'
      }`}
    >
      <div className={`px-4 py-3 border-b ${
        darkMode ? 'border-gray-700' : 'border-gray-100'
      }`}>
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-white bg-gradient-to-br from-blue-500 to-blue-600 flex-shrink-0`}>
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className={`font-semibold text-sm truncate ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {displayName || 'Usuario'}
            </p>
            <p className={`text-xs truncate min-h-[1.25rem] ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {userEmail || '\u00A0'}
            </p>
          </div>
        </div>
      </div>

      <div className="py-1">
        <Link
          to="/perfil"
          onClick={handleProfileClick}
          className={`flex w-full items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
            darkMode
              ? 'text-gray-300 hover:bg-gray-700/50'
              : 'text-gray-700 hover:bg-gray-50'
          }`}
        >
          <Settings size={18} />
          <span>Mi Perfil</span>
        </Link>
      </div>

      <div className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
        <button
          onClick={handleSignOut}
          className={`flex w-full items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
            darkMode
              ? 'text-red-400 hover:bg-gray-700/50'
              : 'text-red-600 hover:bg-red-50'
          }`}
        >
          <LogOut size={18} />
          <span>Cerrar Sesion</span>
        </button>
      </div>
    </motion.div>
  );
};

export default ProfileDropdown;
