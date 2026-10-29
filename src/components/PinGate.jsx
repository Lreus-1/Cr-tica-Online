import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Lock, AlertCircle } from 'lucide-react';
import { isUnlocked, tryUnlock } from '../lib/access.js';
import LuviMark from './LuviMark.jsx';
import OperacaoSelo from './OperacaoSelo.jsx';

/**
 * Pede a senha do setor antes de mostrar o conteúdo.
 * Depois de liberado, fica liberado até fechar o app/aba.
 *
 * Senha errada: o campo fica vermelho e treme, aparece o aviso
 * "Senha incorreta" e, no celular, o aparelho vibra de leve.
 */
export default function PinGate({ setor, nome, children }) {
  const [liberado, setLiberado] = useState(() => isUnlocked(setor));
  const [valor, setValor] = useState('');
  const [aviso, setAviso] = useState('');

  if (liberado) return children;

  const tentar = (pin) => {
    if (tryUnlock(setor, pin)) {
      setLiberado(true);
      return;
    }
    setAviso('Senha incorreta. Tente de novo.');
    setValor('');
    try {
      if (navigator.vibrate) navigator.vibrate(200);
    } catch {
      /* vibração é só um reforço */
    }
  };

  const handleChange = (e) => {
    const pin = e.target.value.replace(/\D/g, '').slice(0, 4);
    setValor(pin);
    if (aviso) setAviso('');
    if (pin.length === 4) tentar(pin);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (valor.length === 4) tentar(valor);
    else setAviso('Digite os 4 dígitos da senha.');
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

      <OperacaoSelo className="pin__selo" />

      <form className="pin__box" onSubmit={handleSubmit} noValidate>
        <span className="home__mark">
          <LuviMark size={24} />
        </span>

        <span className="pin__icon">
          <Lock size={22} strokeWidth={1.75} />
        </span>

        <h1 className="pin__title">{nome}</h1>
        <p className="pin__subtitle">Digite a senha de 4 dígitos para entrar.</p>

        <input
          className={`pin__input ${aviso ? 'is-error' : ''}`}
          type="password"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={4}
          autoComplete="off"
          autoFocus
          value={valor}
          onChange={handleChange}
          aria-label={`Senha do setor ${nome}`}
          aria-invalid={Boolean(aviso)}
          aria-describedby="pin-aviso"
        />

        <p id="pin-aviso" className={`pin__error ${aviso ? 'is-visible' : ''}`} role="alert" aria-live="assertive">
          {aviso && (
            <>
              <AlertCircle size={15} strokeWidth={2} aria-hidden="true" />
              {aviso}
            </>
          )}
        </p>
      </form>
    </div>
  );
}
