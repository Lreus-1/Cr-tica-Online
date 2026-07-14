import { AlertTriangle, RotateCw } from 'lucide-react';

export default function ErrorState({ onRetry }) {
  return (
    <div className="error-state">
      <AlertTriangle size={32} strokeWidth={1.75} />
      <p className="error-state__title">Não foi possível carregar o relatório</p>
      <p className="error-state__msg">
        Verifique sua conexão com a internet e tente novamente.
      </p>
      <button className="error-state__btn" onClick={onRetry} type="button">
        <RotateCw size={16} strokeWidth={2} />
        Tentar novamente
      </button>
    </div>
  );
}
