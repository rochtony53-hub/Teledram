/* Dramini service worker — network-first for HTML navigations, cache-first for static assets. */
const STATIC_CACHE = "dramini-static-v1";

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);

  /* HTML navigations: network first, never serve stale app shells */
  if (request.mode === "navigate") {
    event.respondWith(fetch(request).catch(() => caches.match("/index.html")));
    return;
  }

  /* same-origin static assets & fonts: cache first */
  if (
    (url.origin === self.location.origin && /\.(js|css|png|jpg|jpeg|webp|svg|woff2?)$/.test(url.pathname)) ||
    url.origin.includes("fonts.g")
  ) {
    event.respondWith(
      caches.match(request).then(
        (hit) =>
          hit ||
          fetch(request).then((resp) => {
            if (resp.ok) {
              const copy = resp.clone();
              caches.open(STATIC_CACHE).then((c) => c.put(request, copy));
            }
            return resp;
          })
      )
    );
  }
});
