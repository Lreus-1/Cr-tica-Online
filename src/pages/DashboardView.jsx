import { useRef, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, RotateCw, Maximize, Minimize } from 'lucide-react';
import { getDashboardById } from '../config/dashboards.js';
import PowerBIFrame from '../components/PowerBIFrame.jsx';
import { useFullscreen } from '../hooks/useFullscreen.js';

// Detecta Safari em iOS, onde a Fullscreen API não é suportada para
// elementos arbitrários (apenas <video>). Nesses casos usamos um
// fallback visual: o container assume position:fixed e ocupa 100dvh,
// simulando tela cheia dentro das limitações do navegador.
function isIOS() {
  if (typeof navigator === 'undefined') return false;
  return /iP(hone|ad|od)/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}

export default function DashboardView() {
  const { id } = useParams();
  const dashboard = getDashboardById(id);
  const containerRef = useRef(null);
  const [reloadKey, setReloadKey] = useState(0);
  const [iosFullscreen, setIosFullscreen] = useState(false);

  const { isFullscreen, isSupported, toggle } = useFullscreen(containerRef);
  const iosFallback = isIOS() && !isSupported;

  if (!dashboard) return <Navigate to="/" replace />;

  const handleFullscreenClick = () => {
    if (iosFallback) {
      setIosFullscreen((v) => !v);
      return;
    }
    toggle();
  };

  const active = iosFallback ? iosFullscreen : isFullscreen;

  return (
    <div
      ref={containerRef}
      className={`dashboard-view ${active ? 'is-fullscreen' : ''} ${iosFallback && iosFullscreen ? 'ios-fixed' : ''}`}
    >
      {!active && (
        <header className="dashboard-view__header">
          <Link to="/" className="dv-btn dv-btn--icon" aria-label="Voltar">
            <ArrowLeft size={20} strokeWidth={2.2} />
          </Link>
          <h1 className="dashboard-view__title">{dashboard.nome}</h1>
          <div className="dashboard-view__actions">
            <button
              className="dv-btn dv-btn--icon"
              onClick={() => setReloadKey((k) => k + 1)}
              aria-label="Atualizar relatório"
              type="button"
            >
              <RotateCw size={19} strokeWidth={2.2} />
            </button>
            <button
              className="dv-btn dv-btn--icon"
              onClick={handleFullscreenClick}
              aria-label="Tela cheia"
              type="button"
            >
              <Maximize size={19} strokeWidth={2.2} />
            </button>
          </div>
        </header>
      )}

      {active && (
        <button
          className="dv-exit-fullscreen"
          onClick={handleFullscreenClick}
          aria-label="Sair da tela cheia"
          type="button"
        >
          <Minimize size={18} strokeWidth={2.2} />
        </button>
      )}

      <PowerBIFrame dashboard={dashboard} reloadKey={reloadKey} />
    </div>
  );
}
