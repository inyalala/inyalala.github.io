/* Cleanup Service Worker: clears legacy v1.0.0 precaches and unregisters itself cleanly. */
self.addEventListener('install', function () {
  self.skipWaiting();
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    self.clients
      .claim()
      .then(function () {
        return caches.keys();
      })
      .then(function (keys) {
        return Promise.all(
          keys.map(function (key) {
            return caches.delete(key);
          })
        );
      })
      .then(function () {
        return self.clients.matchAll({ type: 'window', includeUncontrolled: true });
      })
      .then(function (clients) {
        return Promise.all(
          clients.map(function (client) {
            if (client && client.url && 'navigate' in client) {
              return client.navigate(client.url).catch(function () {
                return null;
              });
            }
            return null;
          })
        );
      })
      .then(function () {
        return self.registration.unregister();
      })
  );
});
