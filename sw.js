// ============================================
// SERVICE WORKER - BLENDER SHORTCUTS PWA
// ============================================

const CACHE_NAME = 'blender-shortcuts-v34';
const urlsToCache = [
    './',
    './index.html',
    './manifest.json',
    './css/styles.css',
    './css/responsive.css',
    './css/features.css',
    './css/polish.css',
    './js/app.js',
    './js/app_data.js',
    './js/i18n.js',
    './js/settings.js',
    './js/stats.js',
    // Font Awesome CDN
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css'
];

// Install event - cache assets
self.addEventListener('install', (event) => {
    console.log('[SW] Installing service worker...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[SW] Caching app shell');
                return cache.addAll(urlsToCache);
            })
            .then(() => {
                console.log('[SW] Service worker installed successfully');
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error('[SW] Installation failed:', error);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('[SW] Activating service worker...');
    const cacheWhitelist = [CACHE_NAME];

    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (!cacheWhitelist.includes(cacheName)) {
                            console.log('[SW] Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('[SW] Service worker activated successfully');
                return self.clients.claim();
            })
    );
});

// Fetch event - cache-first strategy
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Cache hit - return from cache
                if (response) {
                    console.log('[SW] Serving from cache:', event.request.url);
                    return response;
                }

                // Not in cache - fetch from network
                console.log('[SW] Fetching from network:', event.request.url);
                return fetch(event.request)
                    .then((response) => {
                        // Don't cache if not a success response
                        if (!response || response.status !== 200 || response.type === 'error') {
                            return response;
                        }

                        // Clone response (can only be consumed once)
                        const responseToCache = response.clone();

                        // Add to cache for future use
                        if (event.request.url.startsWith('http')) {
                            caches.open(CACHE_NAME)
                                .then((cache) => {
                                    cache.put(event.request, responseToCache);
                                });
                        }

                        return response;
                    })
                    .catch((error) => {
                        console.error('[SW] Fetch failed:', error);

                        // Return offline fallback if available
                        return caches.match('./index.html');
                    });
            })
    );
});

// Listen for messages from clients
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});
