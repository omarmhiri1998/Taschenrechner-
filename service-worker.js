const CACHE_NAME = "my-app-v1";

const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./style.css",
    "./dyn.js",
    "./240144.jpg",
    "./manifest.json",
    "./icons/1001.png",
    "./icons/1001.png"
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(FILES_TO_CACHE))
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((cachedFile) => {
                return cachedFile || fetch(event.request);
            })
    );
});