import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import HomePage from './HomePage';

interface VirtualPageProps {
  darkMode: boolean;
  currentUser: { id: string; displayName: string } | null;
  onOpenAuth: () => void;
}

const VirtualPage: React.FC<VirtualPageProps> = ({ darkMode, currentUser, onOpenAuth }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set('modality', 'virtual');
    setSearchParams(params, { replace: true });
  }, []);

  return <HomePage darkMode={darkMode} currentUser={currentUser} onOpenAuth={onOpenAuth} />;
};

export default VirtualPage;
