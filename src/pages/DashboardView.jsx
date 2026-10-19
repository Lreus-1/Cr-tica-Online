import { useRef, useState } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { ArrowLeft, RotateCw, Maximize2, Minimize2, ExternalLink } from 'lucide-react';
import { getDashboardById } from '../config/dashboards.js';
import { getDeliveryDashboardById } from '../config/deliveryDashboards.js';
import { getSecurityDashboardById } from '../config/securityDashboards.js';
import { getPeopleDashboardById } from '../config/peopleDashboards.js';
import PowerBIFrame from '../components/PowerBIFrame.jsx';
import PinGate from '../components/PinGate.jsx';
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

function DashboardContent() {
  const { id } = useParams();
  const navigate = useNavigate();
  // Um painel pode vir da lista do Comercial, da Entrega ou da
  // Segurança — procura nas três, já que essa rota é compartilhada.
  const dashboard =
    getDashboardById(id) ||
    getDeliveryDashboardById(id) ||
    getSecurityDashboardById(id) ||
    getPeopleDashboardById(id);
  const containerRef = useRef(null);
  const [reloadKey, setReloadKey] = useState(0);
  const [iosFullscreen, setIosFullscreen] = useState(false);
  const [status, setStatus] = useState('loading');

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
  const isLoading = status === 'loading' || status === 'slow';

  return (
    <div
      ref={containerRef}
      className={`dashboard-view ${active ? 'is-fullscreen' : ''} ${iosFallback && iosFullscreen ? 'ios-fixed' : ''}`}
    >
      {!active && (
        <header className="dashboard-view__header">
          <button
            className="dv-btn"
            onClick={() => navigate(-1)}
            aria-label="Voltar"
            type="button"
          >
            <ArrowLeft size={17} strokeWidth={2} />
          </button>

          <div className="dashboard-view__title-group">
            <h1 className="dashboard-view__title">{dashboard.nome}</h1>
            <span className="dashboard-view__badge">{dashboard.badge || 'POWER BI'}</span>
          </div>

          <div className="dashboard-view__actions">
            {dashboard.abrirFora && (
              <a
                className="dv-btn"
                href={dashboard.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Abrir em nova aba"
              >
                <ExternalLink size={16} strokeWidth={2} />
              </a>
            )}
            <button
              className="dv-btn"
              onClick={() => setReloadKey((k) => k + 1)}
              aria-label="Atualizar relatório"
              disabled={isLoading}
              type="button"
            >
              <RotateCw
                size={16}
                strokeWidth={2}
                className={`dv-btn__icon ${isLoading ? 'is-spinning' : ''}`}
              />
            </button>
            <button
              className="dv-btn"
              onClick={handleFullscreenClick}
              aria-label="Tela cheia"
              type="button"
            >
              <Maximize2 size={16} strokeWidth={2} />
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
          <Minimize2 size={15} strokeWidth={2} />
        </button>
      )}

      <PowerBIFrame dashboard={dashboard} reloadKey={reloadKey} onStatusChange={setStatus} />
    </div>
  );
}

// Painéis de setores com senha também pedem a senha ao abrir direto
// pelo endereço (sem passar pela tela do setor).
function setorDoPainel(id) {
  if (getSecurityDashboardById(id)) return { setor: 'seguranca', nome: 'Segurança' };
  if (getPeopleDashboardById(id)) return { setor: 'gente-e-gestao', nome: 'Gente e Gestão' };
  return null;
}

export default function DashboardView() {
  const { id } = useParams();
  const protegido = setorDoPainel(id);

  if (!protegido) return <DashboardContent />;

  return (
    <PinGate setor={protegido.setor} nome={protegido.nome}>
      <DashboardContent />
    </PinGate>
  );
}
