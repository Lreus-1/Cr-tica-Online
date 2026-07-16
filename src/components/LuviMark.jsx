/**
 * Marca LUVI recriada em SVG (código, não imagem raster) — barras em
 * branco, pontos e linha em dourado, sem fundo. Evita o problema do PNG
 * original (fundo branco opaco / contorno artificial) e fica nítida em
 * qualquer tamanho.
 */
export default function LuviMark({ size = 26 }) {
  return (
    <svg
      width={size}
      height={(size * 310) / 245}
      viewBox="0 0 245 310"
      aria-hidden="true"
    >
      <rect x="5" y="120" width="55" height="150" fill="currentColor" />
      <rect x="90" y="70" width="55" height="200" fill="currentColor" />
      <rect x="175" y="35" width="55" height="235" fill="currentColor" />
      <path
        d="M30,100 L115,50 L200,15"
        stroke="var(--brand-gold)"
        strokeWidth="9"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="30" cy="100" r="16" fill="var(--brand-gold)" />
      <circle cx="115" cy="50" r="16" fill="var(--brand-gold)" />
      <circle cx="200" cy="15" r="16" fill="var(--brand-gold)" />
    </svg>
  );
}
