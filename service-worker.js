/* Service Worker simples e estável (GitHub Pages) */
const CACHE_NAME = "quizcoin-cache-v3";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./README.txt",
  "./icones/icon-192.png",
  "./icones/icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => (k !== CACHE_NAME ? caches.delete(k) : null)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;

  // Só trata GET
  if (req.method !== "GET") return;

  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req)
        .then((res) => {
          // Se não for uma resposta OK, só retorna
          if (!res || res.status !== 200 || res.type === "opaque") return res;

          // Clona antes de salvar no cache
          const copy = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, copy)).catch(() => {});
          return res;
        })
        .catch(() => caches.match("./index.html"));
    })
  );
});

