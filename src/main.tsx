import { StrictMode, startTransition } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import { AdminProvider } from './contexts/AdminContext';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

// Use createRoot with concurrent features
const root = createRoot(rootElement, {
  // Enable concurrent features for better performance
  onRecoverableError: (error) => {
    if (import.meta.env.DEV) {
      console.error('Recoverable error:', error);
    }
  }
});

// Use startTransition for better performance
startTransition(() => {
  root.render(
    <StrictMode>
      <BrowserRouter>
        <AuthProvider>
          <AdminProvider>
            <App />
          </AdminProvider>
        </AuthProvider>
      </BrowserRouter>
    </StrictMode>
  );
});