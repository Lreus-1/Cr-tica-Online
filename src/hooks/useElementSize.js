import { useEffect, useRef, useState } from 'react';

/**
 * Mede o tamanho real (em pixels) de um elemento via ResizeObserver.
 * Usado pelo BorderBeam para desenhar um contorno SVG que acompanha o
 * card exatamente, em qualquer largura de tela — sem distorcer os
 * cantos arredondados como aconteceria "esticando" um viewBox fixo.
 */
export function useElementSize() {
  const ref = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, size];
}
