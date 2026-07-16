import { useElementSize } from '../hooks/useElementSize.js';

/**
 * Traço de luz que percorre o contorno real do card.
 *
 * Diferente da técnica de conic-gradient (que "empaca" nos cantos de
 * retângulos largos, porque um mesmo ângulo cobre trechos de borda de
 * comprimentos bem diferentes), aqui desenhamos um <rect> SVG com
 * pathLength={100} — isso normaliza o perímetro do retângulo para 100
 * unidades independentemente do tamanho real, então o traço percorre a
 * borda numa velocidade visual constante, contornando o card de verdade.
 */
export default function BorderBeam({ radius = 18, duration = 6 }) {
  const [ref, { width, height }] = useElementSize();
  const ready = width > 0 && height > 0;

  return (
    <span
      ref={ref}
      className="border-beam"
      style={{ '--beam-duration': `${duration}s` }}
      aria-hidden="true"
    >
      {ready && (
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
          <rect
            x={0.75}
            y={0.75}
            width={width - 1.5}
            height={height - 1.5}
            rx={radius}
            pathLength={100}
            className="border-beam__rect"
          />
        </svg>
      )}
    </span>
  );
}
