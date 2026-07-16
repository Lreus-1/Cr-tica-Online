import { useEffect, useRef } from 'react';
import { adConfig } from '../config/ads.js';

/**
 * Bloco de anúncio do Google AdSense na Home.
 *
 * O script de carregamento do AdSense já vem no <head> de index.html
 * (recomendação do próprio Google). Este componente só precisa esperar
 * `window.adsbygoogle` existir e então "empurrar" este slot específico
 * pra ele ser renderizado.
 *
 * Importante: o AdSense só exibe anúncios reais em domínios aprovados
 * na sua conta (não funciona em localhost, exceto com contas de teste).
 * Enquanto `client`/`slot` não forem preenchidos em src/config/ads.js,
 * este componente mostra um placeholder discreto no lugar.
 */
export default function AdSlot() {
  const insRef = useRef(null);
  const pushedRef = useRef(false);
  const configured = adConfig.client && !adConfig.client.includes('XXXX');

  useEffect(() => {
    if (!configured) return undefined;

    const interval = setInterval(() => {
      if (pushedRef.current) {
        clearInterval(interval);
        return;
      }
      if (window.adsbygoogle && insRef.current) {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          pushedRef.current = true;
          clearInterval(interval);
        } catch {
          // Se o AdSense já processou esse slot (ex: hot reload em dev),
          // ele lança um erro de duplicidade — seguro ignorar.
        }
      }
    }, 250);

    return () => clearInterval(interval);
  }, [configured]);

  return (
    <div className="ad-slot">
      <span className="ad-slot__label">Publicidade</span>
      <div className="ad-slot__box">
        {configured ? (
          <ins
            ref={insRef}
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client={adConfig.client}
            data-ad-slot={adConfig.slot}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        ) : (
          <div className="ad-slot__placeholder">
            Configure seu ID do AdSense em <code>src/config/ads.js</code>
          </div>
        )}
      </div>
    </div>
  );
}
