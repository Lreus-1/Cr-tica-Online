import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);

// Depois de uma atualização do portal, os arquivos antigos deixam de existir
// no servidor. Se o navegador pedir um deles, o Vite avisa por este evento:
// limpamos o cache e recarregamos uma vez, em vez de deixar a tela em branco.
window.addEventListener('vite:preloadError', (event) => {
  event.preventDefault();
  if (typeof window.__luviRecuperar === 'function') window.__luviRecuperar();
});

// Service worker (PWA): só em produção, para não atrapalhar o desenvolvimento.
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        // Procura versão nova sempre que o app volta para a frente.
        document.addEventListener('visibilitychange', () => {
          if (document.visibilityState === 'visible') registration.update().catch(() => {});
        });
      })
      .catch(() => {
        /* PWA é um extra: nunca deve quebrar o portal. */
      });
  });
}
