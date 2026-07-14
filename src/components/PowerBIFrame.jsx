import { useEffect, useRef, useState } from 'react';
import Loader from './Loader.jsx';
import ErrorState from './ErrorState.jsx';

const LOAD_TIMEOUT_MS = 20000;

/**
 * Encapsula o iframe do Power BI com loading, timeout e estado de erro.
 *
 * Importante (limitação técnica): por causa da política de cross-origin,
 * o evento `onLoad` do iframe dispara assim que o documento do Power BI
 * termina de carregar — mesmo que o relatório em si exiba um erro interno
 * (ex: link revogado, relatório indisponível). Não é possível inspecionar
 * o DOM interno do iframe nem escutar eventos do Power BI a partir do
 * portal. Por isso, o "erro" tratado aqui cobre os casos que o portal
 * consegue detectar de fato: timeout de carregamento e falha de rede.
 */
export default function PowerBIFrame({ dashboard, reloadKey }) {
  const [status, setStatus] = useState('loading'); // loading | ready | error
  const [retryNonce, setRetryNonce] = useState(0);
  const timeoutRef = useRef(null);
  const frameKey = `${reloadKey}-${retryNonce}`;

  useEffect(() => {
    setStatus('loading');
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setStatus((current) => (current === 'loading' ? 'error' : current));
    }, LOAD_TIMEOUT_MS);
    return () => clearTimeout(timeoutRef.current);
  }, [frameKey, dashboard.url]);

  const handleLoad = () => {
    clearTimeout(timeoutRef.current);
    setStatus('ready');
  };

  const handleRetry = () => {
    setRetryNonce((n) => n + 1);
  };

  return (
    <div className="powerbi-container">
      {status === 'loading' && <Loader nome={dashboard.nome} />}
      {status === 'error' && <ErrorState onRetry={handleRetry} />}

      <iframe
        key={frameKey}
        title={dashboard.nome}
        src={dashboard.url}
        frameBorder="0"
        allowFullScreen="true"
        onLoad={handleLoad}
        className={`powerbi-iframe ${status === 'ready' ? 'is-visible' : ''}`}
        style={status === 'error' ? { visibility: 'hidden' } : undefined}
      />
    </div>
  );
}
