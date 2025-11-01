// === Akur Family Service Worker ===

// Nama cache penyimpanan
const CACHE_NAME = "akur-family-cache-v1";

// File yang disimpan untuk offline
const urlsToCache = [
  "index.html",
  "style.css",
  "app.js",
  "manifest.json",
];

// Install SW → simpan file ke cache
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch → ambil dari cache jika offline
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((resp) => resp || fetch(event.request))
  );
});
