
const CACHE_NAME = 'inspire-plus-v2.6.0';
const offlineFallbackPage = "offline.html";

const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/offline.html',
  '/icons/icon-192x192.png.png',
  '/icons/icon-512x512.png.png',
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap'
];

// Install event - caching assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching shell assets and offline page');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate event - cleaning up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serving from cache or network
self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests like Gemini API
  if (event.request.url.includes('generativelanguage.googleapis.com')) {
    return;
  }

  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.open(CACHE_NAME).then((cache) => {
          return cache.match(event.request).then((response) => {
            return response || cache.match(offlineFallbackPage);
          });
        });
      })
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request).then((response) => {
        // Check if we received a valid response
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        // Clone the response to store it in cache
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          // Only cache same-origin requests or specific CDN assets
          if (event.request.url.startsWith(self.location.origin) || 
              event.request.url.includes('tailwindcss.com') ||
              event.request.url.includes('fonts.googleapis.com')) {
            cache.put(event.request, responseToCache);
          }
        });

        return response;
      });
    })
  );
});
