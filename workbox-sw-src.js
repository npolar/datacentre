// Source for a service worker
// Run `yarn run sw` to compile the script into the "src" folder
// https://workboxjs.org/
// https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook

importScripts('workbox-sw.prod.v2.1.1.js'); // @todo? detect current version?
const workboxSW = new WorkboxSW({clientsClaim: true, skipWaiting: true});

// Leave the following line with empty array as argument
workboxSW.precache([]);

// Requests for non-existing resources are routed to /
workboxSW.router.registerNavigationRoute('index.html');

workboxSW.router.registerRoute(
  'https://cdn.jsdelivr.net/(.*)',
  workboxSW.strategies.cacheFirst()
);

// Revison-cache for Npolar APIs
const npolarApiRE = /^https:\/\/api(-test\.data)?\.npolar\.no\/(.+)[\?\&]rev=(.+)/;
// Cache-first for Npolar API resources containing a revision (they never change...)
workboxSW.router.registerRoute(
  npolarApiRE,
  workboxSW.strategies.cacheFirst()
);

// File-api cacheFirst
// /_file/*.json|$
