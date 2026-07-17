import { useEffect, useRef, useState } from 'react';
import Loader from './Loader.jsx';
import ErrorState from './ErrorState.jsx';

// Aos 16s ainda consideramos normal (relatórios do Power BI variam
// bastante). Entre 16s e 60s, avisamos que está demorando mais que o
// usual, mas continuamos esperando — só declaramos erro de fato aos 60s,
// evitando o "falso alarme" que acontecia com o limite de 20s.
const SLOW_THRESHOLD_MS = 16000;
const HARD_TIMEOUT_MS = 60000;

/**
 * Encapsula o iframe do Power BI com loading, aviso de demora e erro real.
 *
 * Importante (limitação técnica): por causa da política de cross-origin,
 * o evento `onLoad` do iframe dispara assim que o documento do Power BI
 * termina de carregar — mesmo que o relatório em si exiba um erro interno
 * (ex: link revogado, relatório indisponível). Não é possível inspecionar
 * o DOM interno do iframe nem escutar eventos do Power BI a partir do
 * portal. Por isso, o "erro" tratado aqui cobre os casos que o portal
 * consegue detectar de fato: timeout de carregamento e falha de rede.
 */
export default function PowerBIFrame({ dashboard, reloadKey, onStatusChange }) {
  const [status, setStatus] = useState('loading'); // loading | slow | ready | error
  const [retryNonce, setRetryNonce] = useState(0);
  const slowTimerRef = useRef(null);
  const hardTimerRef = useRef(null);
  const frameKey = `${reloadKey}-${retryNonce}`;

  useEffect(() => {
    setStatus('loading');
    onStatusChange?.('loading');
    clearTimeout(slowTimerRef.current);
    clearTimeout(hardTimerRef.current);

    slowTimerRef.current = setTimeout(() => {
      setStatus((current) => {
        if (current !== 'loading') return current;
        onStatusChange?.('slow');
        return 'slow';
      });
    }, SLOW_THRESHOLD_MS);

    hardTimerRef.current = setTimeout(() => {
      setStatus((current) => {
        if (current !== 'loading' && current !== 'slow') return current;
        onStatusChange?.('error');
        return 'error';
      });
    }, HARD_TIMEOUT_MS);

    return () => {
      clearTimeout(slowTimerRef.current);
      clearTimeout(hardTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frameKey, dashboard.url]);

  const handleLoad = () => {
    clearTimeout(slowTimerRef.current);
    clearTimeout(hardTimerRef.current);
    setStatus('ready');
    onStatusChange?.('ready');
  };

  const handleRetry = () => {
    setRetryNonce((n) => n + 1);
  };

  const showLoader = status === 'loading' || status === 'slow';

  return (
    <div className="powerbi-container">
      {showLoader && <Loader nome={dashboard.nome} slow={status === 'slow'} />}
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
