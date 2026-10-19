import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Lock } from 'lucide-react';
import { isUnlocked, tryUnlock } from '../lib/access.js';
import LuviMark from './LuviMark.jsx';

/**
 * Pede a senha do setor antes de mostrar o conteúdo.
 * Depois de liberado, fica liberado até fechar o app/aba.
 */
export default function PinGate({ setor, nome, children }) {
  const [liberado, setLiberado] = useState(() => isUnlocked(setor));
  const [valor, setValor] = useState('');
  const [erro, setErro] = useState(false);

  if (liberado) return children;

  const handleChange = (e) => {
    const pin = e.target.value.replace(/\D/g, '').slice(0, 4);
    setValor(pin);
    setErro(false);

    if (pin.length === 4) {
      if (tryUnlock(setor, pin)) {
        setLiberado(true);
      } else {
        setErro(true);
        setValor('');
      }
    }
  };

  return (
    <div className="pin">
      <div className="home__aurora" aria-hidden="true">
        <span />
        <span />
      </div>

      <Link to="/" className="dv-btn pin__back" aria-label="Voltar ao menu">
        <ArrowLeft size={17} strokeWidth={2} />
      </Link>

      <div className="pin__box">
        <span className="home__mark">
          <LuviMark size={24} />
        </span>

        <span className="pin__icon">
          <Lock size={22} strokeWidth={1.75} />
        </span>

        <h1 className="pin__title">{nome}</h1>
        <p className="pin__subtitle">Digite a senha de 4 dígitos para entrar.</p>

        <input
          className={`pin__input ${erro ? 'is-error' : ''}`}
          type="password"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={4}
          autoComplete="off"
          autoFocus
          value={valor}
          onChange={handleChange}
          aria-label={`Senha do setor ${nome}`}
          aria-invalid={erro}
        />

        <p className="pin__error" role="alert">
          {erro ? 'Senha incorreta. Tente de novo.' : '\u00A0'}
        </p>
      </div>
    </div>
  );
}
