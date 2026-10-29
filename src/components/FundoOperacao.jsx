import foto from '../assets/operacao.webp';

/**
 * Foto da operação ao fundo, bem discreta (kit v1.2): camada fixa atrás
 * do conteúdo, sem interação, dissolvida no fundo por uma máscara.
 * Os cards são opacos, então a foto nunca fica atrás de um número.
 */
export default function FundoOperacao() {
  return (
    <div
      className="op-fundo"
      style={{ backgroundImage: `url(${foto})` }}
      aria-hidden="true"
    />
  );
}
