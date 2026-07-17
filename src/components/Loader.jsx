import { useEffect, useState } from 'react';

// Mensagens que se revezam durante o carregamento normal — não é um
// progresso real (o Power BI não expõe isso por causa do cross-origin),
// mas dá à pessoa a sensação de que algo está de fato acontecendo,
// em vez de fitar um texto parado por vários segundos.
const MESSAGES = [
  'Conectando ao Power BI...',
  'Carregando indicadores...',
  'Organizando os painéis...',
];

export default function Loader({ nome, slow = false }) {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    if (slow) return undefined;
    const interval = setInterval(() => {
      setMessageIndex((i) => (i + 1) % MESSAGES.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [slow]);

  return (
    <div className="loader">
      <span className="loader__bar-track" aria-hidden="true">
        <span className="loader__bar-fill" />
      </span>

      <span className="loader__bars" aria-hidden="true">
        <span />
        <span />
        <span />
      </span>

      <div className="loader__text">
        <p className="loader__title">{nome}</p>
        <p className={`loader__msg ${slow ? 'is-slow' : ''}`}>
          {slow
            ? 'Isso está demorando mais que o normal, mas ainda estamos tentando...'
            : MESSAGES[messageIndex]}
        </p>
      </div>
    </div>
  );
}
