import { operacao } from '../config/operacao.js';

/** Selo da operação (kit v1.2): ponto dourado + nome da unidade atendida. */
export default function OperacaoSelo({ className = '' }) {
  return (
    <span className={`op-selo ${className}`.trim()}>
      <i aria-hidden="true" />
      {operacao.nome}
    </span>
  );
}
