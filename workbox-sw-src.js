// https://workboxjs.org/
// https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook

importScripts('workbox-sw.prod.v2.1.0.js');

const workboxSW = new WorkboxSW({clientsClaim: true, skipWaiting: true});
workboxSW.precache([]);

workboxSW.router.registerNavigationRoute('index.html');

workboxSW.router.registerRoute(
  'https://api-test.data.npolar.no/(.*)',
  workboxSW.strategies.cacheFirst()
);

workboxSW.router.registerRoute(
  'https://api.npolar.no/(.*)',
  workboxSW.strategies.cacheFirst()
);

// Revison-cache for Npolar APIs
// api.npolar.no && [?&]rev=[0-9]+\-[0-9a-f]{N}
// Cache-first for Npolar API resources containing a revision (they never change...)
// workboxSW.router.registerRoute(
//   /^https:\/\/api\.npolar\.no\/(.+)\?rev=(.+)/,
//   workboxSW.strategies.cacheFirst()
// );

// Faceting only
// api.npolar.no && q= && facets && limit === 0
// => network-first


// CDNs: cache-first


// On activate, check if there is any newer than ....
// https://api.npolar.no/dataset/?q=&sort=-updated&limit=1&format=json&variant=array&fields=id,updated
// function fetchJson(url) {
//   return fetch(url).then(r => r.json());
// }
//
// function fetchLatestRevisions(endpoint, params = { sort='-updated', limit=20, fields='id,_rev' }={}) {
//   let url = new URL(`${endpoint}/?q=&sort=${sort}&limit=${limit}&fields=${fields}&format=json&variant=array`, 'https://api.npolar.no');
//   console.log(url);
//   return fetchJson(url);
// }
//
// const endpoint = '/dataset';
// fetchLatestRevisions(endpoint).then(latest => {
//   latest.forEach(d => {
//     const id = d.id;
//     const rev = d._rev;
//     fetchJson(`https://api.npolar.no${endpoint}/${id}?rev=${rev}`).then(dataset => {
//       console.log(dataset.updated, dataset.title);
//     });
//   });
// });
