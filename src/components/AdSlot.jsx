import { useEffect, useRef } from 'react';
import { adConfig } from '../config/ads.js';

const SCRIPT_ID = 'adsbygoogle-script';

function loadAdSenseScript(client) {
  if (document.getElementById(SCRIPT_ID)) return;
  const script = document.createElement('script');
  script.id = SCRIPT_ID;
  script.async = true;
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`;
  script.crossOrigin = 'anonymous';
  document.head.appendChild(script);
}

/**
 * Bloco de anúncio do Google AdSense na Home.
 *
 * Importante: o AdSense só exibe anúncios reais em domínios aprovados
 * na sua conta (não funciona em localhost, exceto com contas de teste).
 * Até lá — e enquanto `client`/`slot` não forem preenchidos em
 * src/config/ads.js — este componente mostra um placeholder discreto no
 * lugar, pra você ver o espaço reservado no layout sem quebrar nada.
 */
export default function AdSlot() {
  const insRef = useRef(null);
  const pushedRef = useRef(false);
  const configured = adConfig.client && !adConfig.client.includes('XXXX');

  useEffect(() => {
    if (!configured) return undefined;

    loadAdSenseScript(adConfig.client);

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
  );
}
