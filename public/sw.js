// Service worker do Hub de Painéis.
//
// Regra principal: NUNCA entregar uma versão velha do app. A tela branca que
// exigia F5 vinha de um cache que devolvia o index.html antigo, apontando
// para arquivos que já não existiam depois de uma atualização.
//
//  - Telas (HTML): sempre buscam na rede primeiro; o cache é só reserva sem internet.
//  - Arquivos /assets/ (nome com código único, nunca mudam): cache primeiro.
//  - Demais arquivos (ícones, manifest): rede primeiro, cache como reserva.
//  - Power BI e qualquer outro site: não passam pelo service worker.
const VERSAO = 'luvi-hub-v2';
const LIMITE_BYTES = 600 * 1024; // não guarda arquivos grandes (artes do acervo)

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((chaves) => Promise.all(chaves.filter((c) => c !== VERSAO).map((c) => caches.delete(c))))
      .then(() => self.clients.claim())
  );
});

function guardar(request, response) {
  const tipo = response.headers.get('content-type') || '';
  const tamanho = Number(response.headers.get('content-length')) || 0;
  // Nunca guarda HTML no lugar de um arquivo (era o erro clássico) nem arquivo grande.
  if (!response.ok || tipo.includes('text/html') || tamanho > LIMITE_BYTES) return;
  const copia = response.clone();
  caches.open(VERSAO).then((cache) => cache.put(request, copia));
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname === '/sw.js') return;

  // Telas: rede primeiro.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((resposta) => {
          const tipo = resposta.headers.get('content-type') || '';
          if (resposta.ok && tipo.includes('text/html')) {
            const copia = resposta.clone();
            caches.open(VERSAO).then((cache) => cache.put('/index.html', copia));
          }
          return resposta;
        })
        .catch(() =>
          caches.match('/index.html').then(
            (reserva) =>
              reserva ||
              new Response('Sem conexão. Abra o portal de novo quando a internet voltar.', {
                status: 503,
                headers: { 'Content-Type': 'text/plain; charset=utf-8' },
              })
          )
        )
    );
    return;
  }

  // Arquivos com código único: cache primeiro.
  if (url.pathname.startsWith('/assets/')) {
    event.respondWith(
      caches.match(request).then(
        (guardado) =>
          guardado ||
          fetch(request).then((resposta) => {
            guardar(request, resposta);
            return resposta;
          })
      )
    );
    return;
  }

  // Demais: rede primeiro, cache como reserva.
  event.respondWith(
    fetch(request)
      .then((resposta) => {
        guardar(request, resposta);
        return resposta;
      })
      .catch(() => caches.match(request))
  );
});
