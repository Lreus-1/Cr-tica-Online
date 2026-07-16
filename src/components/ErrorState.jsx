import { AlertTriangle, RotateCw } from 'lucide-react';

export default function ErrorState({ onRetry }) {
  return (
    <div className="error-state">
      <span className="error-state__icon">
        <AlertTriangle size={18} strokeWidth={2} />
      </span>
      <p className="error-state__title">Não foi possível carregar o relatório</p>
      <p className="error-state__msg">
        Verifique sua conexão com a internet e tente novamente.
      </p>
      <button className="error-state__btn" onClick={onRetry} type="button">
        <RotateCw size={14} strokeWidth={2} />
        Tentar novamente
      </button>
    </div>
  );
}
