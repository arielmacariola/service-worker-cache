const cacheName = 'v1';
const cacheAssets = [
    'index.html',
    'aboutus.html',
    '/js/main.js'
];

// Call Install Event
self.addEventListener('install', e => {
    console.log('Service Worder Installed');

    e.waitUntil(
        caches
            .open(cacheName)
            .then(cache => {
                console.log('Service Worker: Caching Files');
                cache.addAll(cacheAssets);
            })
            .then(() => self.skipWaiting())
    );
})

// Call Activate Event
self.addEventListener('activate', e => {
    console.log('Service Worder Activated');
    // Remove unwanted caches
    e.waitUntil(
        caches.keys()
        .then(cacheNames => {
            cacheNames.map(cache => {
                if(cache !== cacheName) {
                    console.log('Service Worker: Clearing old cache');
                    return caches.delete(cache);
                }
            })
        })
    );
});

// Call Fetch Event
self.addEventListener('fetch', e => {
    console.log('Service Worker: Fetching');
    e.respondWith(
        fetch(e.request).catch(() => caches.match(e.request))
    );
});