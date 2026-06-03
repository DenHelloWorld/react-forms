import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.tsx';
import ModalPortalProvider from './providers/ModalPortalProvider/ModalPortalProvider.tsx';

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(
    <StrictMode>
      <ErrorBoundary>
        <ModalPortalProvider>
          <App />
        </ModalPortalProvider>
      </ErrorBoundary>
    </StrictMode>
  );
}
