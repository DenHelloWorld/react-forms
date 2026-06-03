import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import ModalPortalProvider from './providers/ModalPortalProvider/ModalPortalProvider.tsx';

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(
    <StrictMode>
      <ModalPortalProvider>
        <App />
      </ModalPortalProvider>
    </StrictMode>
  );
}
