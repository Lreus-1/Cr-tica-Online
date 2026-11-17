import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Lock, AlertCircle } from 'lucide-react';
import { isUnlocked, tryUnlock } from '../lib/access.js';
import LuviMark from './LuviMark.jsx';
import OperacaoSelo from './OperacaoSelo.jsx';

const TAMANHO = 4;
// Tempo do check de sucesso antes de abrir o setor (transitions.dev: success check).
const SUCESSO_MS = 520;

/**
 * Pede a senha do setor antes de mostrar o conteúdo.
 * Depois de liberado, fica liberado até fechar o app/aba.
 *
 * Senha errada: a caixa treme (error state shake), aparece "Senha incorreta" e,
 * no celular, o aparelho vibra de leve. Senha certa: o cadeado vira um check
 * que se desenha, e só então o setor abre.
 *
 * O campo de verdade continua sendo um <input> numérico (teclado numérico do
 * celular, leitor de tela, colar). Ele fica por cima dos 4 pontos, invisível,
 * para que tocar em qualquer parte da caixa abra o teclado.
 */
export default function PinGate({ setor, nome, children }) {
  const [liberado, setLiberado] = useState(() => isUnlocked(setor));
  const [valor, setValor] = useState('');
  const [aviso, setAviso] = useState('');
  const [ok, setOk] = useState(false);
  const campo = useRef(null);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  if (liberado) return children;

  const tentar = (pin) => {
    if (tryUnlock(setor, pin)) {
      setOk(true);
      timer.current = setTimeout(() => setLiberado(true), SUCESSO_MS);
      return;
    }
    setAviso('Senha incorreta. Tente de novo.');
    setValor('');
    // Reinicia o tremor a cada erro: tira a classe, força o reflow, põe de volta.
    const el = campo.current;
    if (el) {
      el.classList.remove('is-shaking');
      void el.offsetWidth;
      el.classList.add('is-shaking');
    }
    try {
      if (navigator.vibrate) navigator.vibrate(200);
    } catch {
      /* vibração é só um reforço */
    }
  };

  const handleChange = (e) => {
    if (ok) return;
    const pin = e.target.value.replace(/\D/g, '').slice(0, TAMANHO);
    setValor(pin);
    if (aviso) setAviso('');
    if (pin.length === TAMANHO) tentar(pin);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ok) return;
    if (valor.length === TAMANHO) tentar(valor);
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

      <form className={`pin__box ${ok ? 'is-ok' : ''}`} onSubmit={handleSubmit} noValidate>
        <span className="home__mark">
          <LuviMark size={24} />
        </span>

        <span className="pin__icon" aria-hidden="true">
          <Lock className="pin__lock" size={22} strokeWidth={1.75} />
          <svg className="pin__check" viewBox="0 0 24 24" width="24" height="24" fill="none">
            <path d="M5 12.5l4.5 4.5L19 7.5" pathLength="1" />
          </svg>
        </span>

        <h1 className="pin__title">{nome}</h1>
        <p className="pin__subtitle">{ok ? 'Acesso liberado.' : 'Digite a senha de 4 dígitos para entrar.'}</p>

        <div
          ref={campo}
          className={`pin__field ${aviso ? 'is-error' : ''}`}
        >
          <span className="pin__dots" aria-hidden="true">
            {Array.from({ length: TAMANHO }, (_, i) => (
              <i key={i} className={i < valor.length ? 'is-filled' : ''} />
            ))}
          </span>
          <input
            className="pin__input"
            type="password"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={TAMANHO}
            autoComplete="off"
            autoFocus
            value={valor}
            onChange={handleChange}
            aria-label={`Senha do setor ${nome}`}
            aria-invalid={Boolean(aviso)}
            aria-describedby="pin-aviso"
          />
        </div>

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
