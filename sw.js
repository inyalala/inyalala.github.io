/**
 * SERVICE WORKER for Progressive Web App
 * Enables offline functionality and asset caching
 * @author Dr. Innocent Nyalala - IIT Madras Zanzibar
 * @version 1.0.0
 */

const CACHE_NAME = 'inyalala-portfolio-v1.0.0';
const RUNTIME_CACHE = 'inyalala-runtime-v1.0.0';

// Assets to cache on install
const PRECACHE_ASSETS = [
    '/',
    '/index.html',
    '/css/modern.min.css',
    '/js/main-bundle.min.js',
    '/js/image-optimization.js',
    '/images/Photo.webp',
    '/images/saail-logo1.webp',
    '/manifest.json',
    '/assets/favicon.ico',
    '/assets/favicon-32x32.png'
];

// Install event - cache critical assets
self.addEventListener('install', (event) => {
    console.log('[Service Worker] Installing...');

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[Service Worker] Precaching assets');
                return cache.addAll(PRECACHE_ASSETS);
            })
            .then(() => {
                console.log('[Service Worker] Installation complete');
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error('[Service Worker] Precaching failed:', error);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('[Service Worker] Activating...');

    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames
                        .filter((cacheName) => {
                            return cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE;
                        })
                        .map((cacheName) => {
                            console.log('[Service Worker] Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        })
                );
            })
            .then(() => {
                console.log('[Service Worker] Activation complete');
                return self.clients.claim();
            })
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip cross-origin requests
    if (url.origin !== location.origin) {
        // Cache external resources (fonts, CDN assets)
        if (request.destination === 'font' || request.destination === 'style' || request.destination === 'script') {
            event.respondWith(cacheFirst(request));
        }
        return;
    }

    // Handle API requests with network-first strategy
    if (url.pathname.startsWith('/api/')) {
        event.respondWith(networkFirst(request));
        return;
    }

    // Handle images with cache-first strategy
    if (request.destination === 'image') {
        event.respondWith(cacheFirst(request));
        return;
    }

    // Handle navigation requests
    if (request.mode === 'navigate') {
        event.respondWith(networkFirst(request));
        return;
    }

    // Default: cache-first for everything else
    event.respondWith(cacheFirst(request));
});

// Cache-first strategy
async function cacheFirst(request) {
    const cache = await caches.open(RUNTIME_CACHE);
    const cached = await cache.match(request);

    if (cached) {
        console.log('[Service Worker] Cache hit:', request.url);
        return cached;
    }

    try {
        const response = await fetch(request);

        if (response.ok) {
            console.log('[Service Worker] Caching new resource:', request.url);
            cache.put(request, response.clone());
        }

        return response;
    } catch (error) {
        console.error('[Service Worker] Fetch failed:', error);

        // Return offline page for navigation requests
        if (request.mode === 'navigate') {
            const offlineCache = await caches.open(CACHE_NAME);
            return offlineCache.match('/index.html');
        }

        throw error;
    }
}

// Network-first strategy
async function networkFirst(request) {
    const cache = await caches.open(RUNTIME_CACHE);

    try {
        const response = await fetch(request);

        if (response.ok) {
            console.log('[Service Worker] Updating cache:', request.url);
            cache.put(request, response.clone());
        }

        return response;
    } catch (error) {
        console.log('[Service Worker] Network failed, serving from cache:', request.url);
        const cached = await cache.match(request);

        if (cached) {
            return cached;
        }

        throw error;
    }
}

// Listen for messages from the client
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        console.log('[Service Worker] Skipping waiting...');
        self.skipWaiting();
    }

    if (event.data && event.data.type === 'CACHE_URLS') {
        console.log('[Service Worker] Caching URLs from client');
        const urls = event.data.urls;

        caches.open(RUNTIME_CACHE)
            .then((cache) => cache.addAll(urls))
            .then(() => {
                event.ports[0].postMessage({ cached: true });
            })
            .catch((error) => {
                console.error('[Service Worker] Manual caching failed:', error);
                event.ports[0].postMessage({ cached: false, error: error.message });
            });
    }
});

// Background sync (for future use with contact forms)
self.addEventListener('sync', (event) => {
    console.log('[Service Worker] Background sync:', event.tag);

    if (event.tag === 'sync-contacts') {
        event.waitUntil(syncContacts());
    }
});

async function syncContacts() {
    // Placeholder for future contact form sync
    console.log('[Service Worker] Syncing contacts...');
}

// Push notifications (for future use)
self.addEventListener('push', (event) => {
    console.log('[Service Worker] Push received');

    const options = {
        body: event.data ? event.data.text() : 'New update available',
        icon: '/assets/icon-192x192.png',
        badge: '/assets/icon-96x96.png',
        vibrate: [200, 100, 200],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: 'View',
                icon: '/assets/icon-96x96.png'
            },
            {
                action: 'close',
                title: 'Close',
                icon: '/assets/icon-96x96.png'
            }
        ]
    };

    event.waitUntil(
        self.registration.showNotification('Dr. Innocent Nyalala', options)
    );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
    console.log('[Service Worker] Notification clicked:', event.action);

    event.notification.close();

    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

console.log('[Service Worker] Script loaded');
