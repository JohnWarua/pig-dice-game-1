/**
 * Create cache when SW installs
 */
const cacheName = "static-cache-v1";

const filesToCache = [
  "./",
  "./public/css/style.min.css",
  "./public/css/style.min.css.map",
  "./public/js/app.min.js",
  "./public/js/app.min.js.map",
  "./static/dice-1.png",
  "./static/dice-2.png",
  "./static/dice-3.png",
  "./static/dice-4.png",
  "./static/dice-5.png",
  "./static/dice-6.png",
  "./static/back.jpg",
  "./static/favicons/android-chrome-192x192.png",
  "./static/favicons/android-chrome-256x256.png",
  "./static/favicons/apple-touch-icon.png",
  "./static/favicons/browserconfig.xml",
  "./static/favicons/favicon-16x16.png",
  "./static/favicons/favicon-32x32.png",
  "./static/favicons/favicon.ico",
  "./static/favicons/manifest.json",
  "./static/favicons/mstile-150x150.png",
  "./static/favicons/safari-pinned-tab.svg",
];

/**
 * Cache static files
 */
self.addEventListener("install", e => {
  console.log("[ServiceWorker] Install");
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log("[ServiceWorker] Caching app shell");
      return cache.addAll(filesToCache);
    })
  );
});

/**
 *  Purge previous cache after activating the next cache
 */
self.addEventListener("activate", e => {
  console.log("[ServiceWorker] Activate");
  e.waitUntil(
    caches.keys().then(keyList =>
      Promise.all(
        keyList.map(key => {
          if (key !== cacheName) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});

/**
 * Serve app from cache if there is a cached version
 */
self.addEventListener("fetch", event => {
  event.respondWith(
    caches
      .match(event.request)
      .then(response => response || fetch(event.request))
  );
});
