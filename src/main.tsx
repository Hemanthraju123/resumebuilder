import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'sonner';
import App from './App';
import { ResumeProvider } from './context/ResumeContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ResumeProvider>
        <App />
        <Toaster position="top-right" richColors closeButton />
      </ResumeProvider>
    </BrowserRouter>
  </StrictMode>
);