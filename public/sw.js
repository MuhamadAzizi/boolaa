importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

workbox.precaching.precacheAndRoute([
    { url: '/', revision: '1' },
    { url: '/index.html', revision: '1' },
    { url: '/nav.html', revision: '1' },
    { url: '/team.html', revision: '1' },
    { url: '/manifest.json', revision: '1' },
    { url: '/pages/favorite.html', revision: '1' },
    { url: '/pages/home.html', revision: '1' },
    { url: '/pages/matches.html', revision: '1' },
    { url: '/pages/scorer.html', revision: '1' },
    { url: '/pages/standings.html', revision: '1' },
    { url: '/css/materialize.min.css', revision: '1' },
    { url: '/css/style.css', revision: '1' },
    { url: '/js/materialize.min.js', revision: '1' },
    { url: '/js/nav.js', revision: '1' },
    { url: '/js/sw-init.js', revision: '1' },
    { url: '/js/api.js', revision: '1' },
    { url: '/js/db.js', revision: '1' },
    { url: '/js/idb.js', revision: '1' },
    { url: '/sw.js', revision: '1' },
    { url: '/images/touch/icon-72x72.png', revision: '1' },
    { url: '/images/touch/icon-96x96.png', revision: '1' },
    { url: '/images/touch/icon-128x128.png', revision: '1' },
    { url: '/images/touch/icon-192x192.png', revision: '1' },
    { url: '/images/touch/icon-256x256.png', revision: '1' },
    { url: '/images/touch/icon-384x384.png', revision: '1' },
    { url: '/images/touch/icon-512x512.png', revision: '1' },
    { url: '/images/touch/iconmaskable-72x72.png', revision: '1' },
    { url: '/images/touch/iconmaskable-96x96.png', revision: '1' },
    { url: '/images/touch/iconmaskable-128x128.png', revision: '1' },
    { url: '/images/touch/iconmaskable-192x192.png', revision: '1' },
    { url: '/images/touch/iconmaskable-256x256.png', revision: '1' },
    { url: '/images/touch/iconmaskable-384x384.png', revision: '1' },
    { url: '/images/touch/iconmaskable-512x512.png', revision: '1' },
    { url: '/images/touch/apple-icon-180x180.png', revision: '1' },
    { url: '/favicon.png', revision: '1' },
], { ignoreURLParametersMatching: [/.*/] })

workbox.routing.registerRoute(
    new RegExp('https://fonts.googleapis.com/'),
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets'
    })
)

workbox.routing.registerRoute(
    new RegExp('https://fonts.gstatic.com/'),
    new workbox.strategies.CacheFirst({
        cacheName: 'google-font-webfonts'
    })
)

workbox.routing.registerRoute(
    new RegExp('/pages/'),
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'pages'
    })
)

workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org/v2/'),
    new workbox.strategies.CacheFirst({
        cacheName: 'api'
    })
)

workbox.routing.registerRoute(
    /\.(?:png|jpg|gif|jfif|jpeg|svg)/,
    new workbox.strategies.CacheFirst({
        cacheName: 'images',
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                maxEntries: 40,
                maxAgeSeconds: 30 * 24 * 60 * 60,
            })
        ]
    })
)

// const CACHE_NAME = 'boolaa-v1.5'
// const urlsToCache = [
//     '/',
//     '/css/materialize.min.css',
//     '/css/style.css',
//     '/js/api.js',
//     '/js/db.js',
//     '/js/idb.js',
//     '/js/materialize.min.js',
//     '/js/nav.js',
//     '/js/sw-init.js',
//     '/sw.js',
//     '/pages/favorite.html',
//     '/pages/home.html',
//     '/pages/matches.html',
//     '/pages/scorer.html',
//     '/pages/standings.html',
//     '/index.html',
//     '/nav.html',
//     '/team.html',
//     '/manifest.json',

//     'https://fonts.googleapis.com/icon?family=Material+Icons',
//     'https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
//     'https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2',

//     'https://fonts.googleapis.com/css2?family=Josefin+Sans&display=swap',
//     'https://fonts.gstatic.com/s/josefinsans/v16/Qw3PZQNVED7rKGKxtqIqX5E-AVSJrOCfjY46_DjQbMZhLw.woff2',

//     '/images/touch/icon-72x72.png',
//     '/images/touch/icon-96x96.png',
//     '/images/touch/icon-128x128.png',
//     '/images/touch/icon-192x192.png',
//     '/images/touch/icon-256x256.png',
//     '/images/touch/icon-384x384.png',
//     '/images/touch/icon-512x512.png',
//     '/images/touch/iconmaskable-72x72.png',
//     '/images/touch/iconmaskable-96x96.png',
//     '/images/touch/iconmaskable-128x128.png',
//     '/images/touch/iconmaskable-192x192.png',
//     '/images/touch/iconmaskable-256x256.png',
//     '/images/touch/iconmaskable-384x384.png',
//     '/images/touch/iconmaskable-512x512.png',
//     '/images/touch/apple-icon-180x180.png',
//     '/favicon.png'
// ]

// self.addEventListener('install', event => {
//     event.waitUntil(
//         caches.open(CACHE_NAME)
//         .then(cache => {
//             return cache.addAll(urlsToCache)
//         })
//     )
// })

// self.addEventListener('fetch', event => {
//     const baseUrl = 'https://api.football-data.org/'

//     if (event.request.url.indexOf(baseUrl) > -1) {
//         event.respondWith(
//             caches.open(CACHE_NAME)
//             .then(cache => {
//                 return fetch(event.request).then(response => {
//                     cache.put(event.request.url, response.clone())
//                     return response
//                 })
//             })
//         )
//     } else {
//         event.respondWith(
//             caches.match(event.request, {ignoreSearch: true})
//             .then(response => {
//                 return response || fetch(event.request)
//             })
//         )
//     }
// })

// self.addEventListener('activate', event => {
//     event.waitUntil(
//         caches.keys().then(cacheNames => {
//             return Promise.all(
//                 cacheNames.map(cacheName => {
//                     if(cacheName !== CACHE_NAME) {
//                         console.log(`Service Worker: ${cacheName} dihapus`)
//                         return caches.delete(cacheName)
//                     }
//                 })
//             )
//         })
//     )
// })

// self.addEventListener("activate", function(event) {
//     event.waitUntil(
//         caches.keys().then(function(cacheNames) {
//             return Promise.all(
//                 cacheNames.map(function(cacheName) {
//                     if (cacheName != CACHE_NAME) {
//                         console.log("ServiceWorker: cache " + cacheName + " dihapus")
//                         return caches.delete(cacheName)
//                     }
//                 })
//             )
//         })
//     )
// })

self.addEventListener('push', function(event) {
    var body;
    if (event.data) {
      body = event.data.text();
    } else {
      body = 'Push message no payload';
    }
    var options = {
        body: body,
        icon: 'images/touch/iconmaskable-128x128.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});