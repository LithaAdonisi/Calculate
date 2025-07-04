// A name for our cache
const CACHE_NAME = 'calculator-v1';

// The files we want to cache. Since all CSS and JS is inline, we only need the main HTML file.
const urlsToCache = [
  './' // This represents the root directory, which will load index.html
];

// Install event: This is triggered when the service worker is first installed.
self.addEventListener('install', event => {
  // We wait until the installation is complete
  event.waitUntil(
    // Open our cache
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        // Add all the files we want to cache
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event: This is triggered for every request the page makes.
self.addEventListener('fetch', event => {
  event.respondWith(
    // Try to find a matching request in our cache
    caches.match(event.request)
      .then(response => {
        // If we find a match in the cache, return it.
        // Otherwise, fetch it from the network.
        return response || fetch(event.request);
      })
  );
});