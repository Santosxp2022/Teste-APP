/* Service Worker robusto (não quebra se algum arquivo não existir) */
const CACHE_NAME = "quizcoin-cache-v4";

// coloque aqui só o essencial (arquivos que você TEM certeza que existem)
const CORE = [
  "./",
  "./index.html",
  "./manifest.json",
  "./service-worker.js"
];

// tentativa de cache de extras (se não existir, ignora)
const OPTIONAL = [
  "./README.txt",
  "./icones/icon-192.png",
  "./icones/icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);

    // Core: se falhar, pelo menos não quebra tudo (mas geralmente esses existem)
    try { await cache.addAll(CORE); } catch (e) {}

    // Optional: tenta um por um (se algum falhar, segue)
    for (const url of OPTIONAL) {
      try { await cache.add(url); } catch (e) {}
    }

    self.skipWaiting();
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map(k => (k !== CACHE_NAME ? caches.delete(k) : null)));
    self.clients.claim();
  })());
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  event.respondWith((async () => {
    const cached = await caches.match(req);
    if (cached) return cached;

    try {
      const res = await fetch(req);
      // Clona antes de cachear
      const copy = res.clone();
      const cache = await caches.open(CACHE_NAME);
      cache.put(req, copy).catch(() => {});
      return res;
    } catch (e) {
      // fallback
      return caches.match("./index.html");
    }
  })());
});


 

