import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import HomePage from './HomePage';

interface SemipresencialPageProps {
  darkMode: boolean;
  currentUser: { id: string; displayName: string } | null;
  onOpenAuth: () => void;
}

const SemipresencialPage: React.FC<SemipresencialPageProps> = ({ darkMode, currentUser, onOpenAuth }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set('modality', 'semipresencial');
    setSearchParams(params, { replace: true });
  }, []);

  return <HomePage darkMode={darkMode} currentUser={currentUser} onOpenAuth={onOpenAuth} />;
};

export default SemipresencialPage;
