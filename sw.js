const CACHE_NAME = 'retrocloud-v3';
const APP_SHELL = [
  './index.html',
  './games.json',
  './manifest.json',
  './assets/retrocloud-social.svg'
];
const CACHEABLE_CROSS_ORIGIN = new Set([
  'https://cdn.jsdelivr.net',
  'https://fonts.googleapis.com',
  'https://fonts.gstatic.com',
  'https://shared.akamai.steamstatic.com',
  'https://raw.githubusercontent.com'
]);

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(key => key.startsWith('retrocloud-') && key !== CACHE_NAME)
          .map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const requestUrl = new URL(request.url);
  const isSameOrigin = requestUrl.origin === self.location.origin;
  if (!isSameOrigin && !CACHEABLE_CROSS_ORIGIN.has(requestUrl.origin)) return;

  if (isSameOrigin && requestUrl.pathname.endsWith('/games.json')) {
    event.respondWith(
      fetch(request).then(response => {
        if (!response.ok) throw new Error(`games.json respondió ${response.status}`);
        const copy = response.clone();
        return caches.open(CACHE_NAME).then(cache => cache.put(request, copy).then(() => response).catch(error => {
          console.error('[RetroCloud SW] No se pudo actualizar la caché del catálogo', error);
          return response;
        }));
      }).catch(() => caches.match(request).then(cached => {
        if (cached) return cached;
        return new Response('{"error":"El catálogo no está disponible en línea ni en caché."}', {
          status: 503,
          headers: { 'Content-Type': 'application/json; charset=utf-8' }
        });
      }))
    );
    return;
  }

  if (isSameOrigin && request.mode === 'navigate') {
    event.respondWith(
      fetch(request).then(response => {
        if (!response.ok) throw new Error(`La navegación respondió ${response.status}`);
        const copy = response.clone();
        return caches.open(CACHE_NAME).then(cache => cache.put('./index.html', copy).then(() => response).catch(error => {
          console.error('[RetroCloud SW] No se pudo actualizar la caché de la app', error);
          return response;
        }));
      }).catch(() => caches.match('./index.html').then(cached => {
        if (cached) return cached;
        return new Response('RetroCloud no está disponible sin conexión.', {
          status: 503,
          headers: { 'Content-Type': 'text/plain; charset=utf-8' }
        });
      }))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;
      return fetch(request).then(response => {
        if (response.ok && response.type !== 'opaque') {
          const copy = response.clone();
          return caches.open(CACHE_NAME).then(cache => cache.put(request, copy).then(() => response).catch(error => {
            console.error('[RetroCloud SW] No se pudo actualizar la caché del recurso', error);
            return response;
          }));
        }
        return response;
      });
    })
  );
});
