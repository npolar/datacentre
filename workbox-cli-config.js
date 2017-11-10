module.exports = {
  "globDirectory": "src/",
  "globPatterns": [
    "**/*.{js,css,json,png,html,ico}"
  ],
  "swSrc": "workbox-sw-src.js",
  "swDest": "src/workbox-sw.js",
  "globIgnores": [
    "../workbox-cli-config.js",
    "../workbox-sw-src.js"
  ]
};
