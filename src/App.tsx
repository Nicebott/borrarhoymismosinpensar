import React, { useState, useEffect, useMemo } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Navigation from './components/Navigation';
import Chat from './components/Chat';
import AuthModal from './components/AuthModal';
import TermsModal from './components/Chat/TermsModal';
import PrivacyModal from './components/Chat/PrivacyModal';
import HomePage from './pages/HomePage';
import FAQPage from './pages/FAQPage';
import ForumPage from './pages/ForumPage';
import AdminPage from './pages/AdminPage';
import VirtualPage from './pages/VirtualPage';
import SemipresencialPage from './pages/SemipresencialPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import { useAuth } from './hooks/useAuth';
import { Toaster } from 'react-hot-toast';
import { checkIsAdmin, checkIsSuperAdmin } from './services/adminService';

function App() {
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  const currentUser = useMemo(() => {
    if (!user) return null;
    return {
      id: user.id,
      displayName: user.user_metadata?.display_name || user.email || 'Usuario',
    };
  }, [user]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (user) {
        const isAdmin = await checkIsAdmin(user.id);
        const isSuperAdmin = await checkIsSuperAdmin(user.id);
        setIsUserAdmin(isAdmin || isSuperAdmin);
      } else {
        setIsUserAdmin(false);
      }
    };
    checkAdminStatus();
  }, [user]);

  const toggleDarkMode = () => {
    setDarkMode((prev: boolean) => !prev);
  };

  const handleOpenAuth = () => {
    setIsAuthModalOpen(true);
  };

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
        <Toaster position="top-center" />

        <Navigation
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          user={currentUser}
          showProfileDropdown={showProfileDropdown}
          setShowProfileDropdown={setShowProfileDropdown}
          setIsAuthModalOpen={setIsAuthModalOpen}
          isUserAdmin={isUserAdmin}
        />

        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-grow">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  darkMode={darkMode}
                  currentUser={currentUser}
                  onOpenAuth={handleOpenAuth}
                />
              }
            />
            <Route
              path="/virtual"
              element={
                <VirtualPage
                  darkMode={darkMode}
                  currentUser={currentUser}
                  onOpenAuth={handleOpenAuth}
                />
              }
            />
            <Route
              path="/semipresencial"
              element={
                <SemipresencialPage
                  darkMode={darkMode}
                  currentUser={currentUser}
                  onOpenAuth={handleOpenAuth}
                />
              }
            />
            <Route
              path="/faq"
              element={<FAQPage darkMode={darkMode} />}
            />
            <Route
              path="/foro"
              element={
                <ForumPage
                  darkMode={darkMode}
                  onOpenAuth={handleOpenAuth}
                />
              }
            />
            <Route
              path="/admin"
              element={<AdminPage darkMode={darkMode} />}
            />
            <Route
              path="/terms"
              element={<TermsPage darkMode={darkMode} />}
            />
            <Route
              path="/privacy"
              element={<PrivacyPage darkMode={darkMode} />}
            />
          </Routes>
        </main>

        <footer className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md mt-auto`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-center md:text-left">
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  (c) 2024 Nicebott. Todos los derechos reservados.
                </p>
                <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  Desarrollado con amor para la comunidad estudiantil
                </p>
              </div>
              <div className="flex gap-4">
                <FooterLink
                  to="/terms"
                  darkMode={darkMode}
                >
                  Terminos y Condiciones
                </FooterLink>
                <FooterLink
                  to="/privacy"
                  darkMode={darkMode}
                >
                  Politica de Privacidad
                </FooterLink>
              </div>
            </div>
          </div>
        </footer>

        <Chat darkMode={darkMode} onOpenAuth={handleOpenAuth} />

        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          darkMode={darkMode}
        />

        <TermsModal
          isOpen={showTermsModal}
          onClose={() => setShowTermsModal(false)}
          darkMode={darkMode}
        />

        <PrivacyModal
          isOpen={showPrivacyModal}
          onClose={() => setShowPrivacyModal(false)}
          darkMode={darkMode}
        />
      </div>
  );
}

interface FooterLinkProps {
  to: string;
  darkMode: boolean;
  children: React.ReactNode;
}

const FooterLink: React.FC<FooterLinkProps> = ({ to, darkMode, children }) => (
  <Link
    to={to}
    className={`text-sm ${
      darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'
    } transition-colors`}
  >
    {children}
  </Link>
);

export default App;
