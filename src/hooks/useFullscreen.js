import { useCallback, useEffect, useState } from 'react';

/**
 * Hook para controlar tela cheia em um elemento via ref.
 *
 * Trata os prefixos vendor necessários para Safari (iOS/macOS) e detecta
 * quando a Fullscreen API não está disponível — caso do Safari no iPhone,
 * que não suporta fullscreen para elementos arbitrários. Nesse caso,
 * isSupported retorna false e a UI deve esconder o botão ou oferecer
 * um fallback (ver PowerBIView, que usa um modo "tela cheia visual" via
 * CSS position:fixed como alternativa no iOS).
 */
export function useFullscreen(targetRef) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const getFsElement = () =>
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.msFullscreenElement ||
    null;

  const isSupported =
    typeof document !== 'undefined' &&
    (document.fullscreenEnabled ||
      document.webkitFullscreenEnabled ||
      document.msFullscreenEnabled);

  useEffect(() => {
    const handleChange = () => setIsFullscreen(!!getFsElement());
    document.addEventListener('fullscreenchange', handleChange);
    document.addEventListener('webkitfullscreenchange', handleChange);
    document.addEventListener('MSFullscreenChange', handleChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleChange);
      document.removeEventListener('webkitfullscreenchange', handleChange);
      document.removeEventListener('MSFullscreenChange', handleChange);
    };
  }, []);

  const enter = useCallback(() => {
    const el = targetRef.current;
    if (!el) return;
    if (el.requestFullscreen) el.requestFullscreen();
    else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
    else if (el.msRequestFullscreen) el.msRequestFullscreen();
  }, [targetRef]);

  const exit = useCallback(() => {
    if (document.exitFullscreen) document.exitFullscreen();
    else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
    else if (document.msExitFullscreen) document.msExitFullscreen();
  }, []);

  const toggle = useCallback(() => {
    if (getFsElement()) exit();
    else enter();
  }, [enter, exit]);

  return { isFullscreen, isSupported, toggle };
}
