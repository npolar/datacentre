const npolarApiBase = 'https://api.npolar.no';
const npolarApiTest = 'https://api-test.data.npolar.no';
let base = npolarApiBase;
// Override with <npolar-api base=""></npolar-api>

function isDev(location) {
  const hostname = new URL(location).hostname;
  return /(localhost|127.0.0.1)$/.test(hostname);
}

function isTest(location) {
  const hostname = new URL(location).hostname;
  return /test\.data\.npolar\.no$/.test(hostname);
}

// Override
if (document) {
  let npolarApiElement = document.querySelector('npolar-api');
  if (npolarApiElement) {
    base = npolarApiElement.getAttribute('base');
  // Use test api base if in dev or test environment
  } else if (document.location) {
    if (isDev(document.location) || isTest(document.location)) {
      base = npolarApiTest;
    }
  }
}

// Sanity checks
if (document) {
  if (base === npolarApiTest) {
    const nameElement = document.querySelector('#logo-name');
    if (nameElement) {
      nameElement.textContent = nameElement.textContent.replace('data', 'test');
    }
  }
  if (base === npolarApiBase && isTest(document.location)) {
    const forbidden = 'Forbidden to run against production API from the test environment';
    if (document) {
      document.querySelector('datacentre-fatal').innerHTML = `<h1>${forbidden}</h1>`;
    }
    throw new Error(forbidden);
  }

}

const url = new URL(base);
if (!(/^http(s)?:[/]{2}/).test(url.origin)) {
  // @todo The test is sloppy, ^http:// should only work for localhost
  throw new Error('npolarApiBase must start with https://');
}
if ((/\.npolar\.no$/).test(url.origin) && !('https:' === url.protocol)) {
  throw new Error('npolarApiBase must use HTTPS for *.npolar.no services');
}

export {url as npolarApiBase};
