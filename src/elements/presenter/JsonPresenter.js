import {ApiRequest} from '../../../npolar-api/fetch/ApiRequest.js';
import {searchParams} from '../../../browser/searchParams.js';
import {MicroCard} from '../card/MicroCard.js';

// Thanks https://github.com/zvakanaka/view-json
if ('attachShadow' in document.head) {
  injectHeadScript('https://cdn.jsdelivr.net/gh/zvakanaka/view-json@2/view-json.js');
}


export class JsonPresenter extends HTMLElement {

  // Relative URI => for Npolar API (see #load)
  static get observedAttributes() {
    return ['uri'];
  }

  attributeChangedCallback(attr, was, is) {
    if (is && is !== was) {
      console.debug(`${attr} = "${is}"`, `<- ${was}`);
      this.load();
    }
  }

  connectedCallback() {
    if (!this.hasAttribute('uri') || this.uri.length === 0) {
      const url = new URL(document.location);
      this.uri = url.pathname+url.search;
    }
    this.appendChild(this.template());
  }

  // Get and set document
  load() {
    ApiRequest.get(this.uri).then(d => this.d=d);
  }

  replace(k,v) {
    const removeKeys = /^(_id|schema|collection)$/;
    if (removeKeys.test(k)) {
      return undefined;
    } else {
      return v;
    }

  }

  // Set
  set d(d) {
    let viewJson = document.querySelector('view-json');
    viewJson.removeAttribute('no-parse');
    viewJson.textContent = JSON.stringify(d, this.replace, 2);
  }

  get uri() {
    return this.getAttribute('uri');
  }

  set uri(uri) {
    return this.setAttribute('uri', uri);
  }

  template() {
    const div =  document.createElement('div');
    div.hidden = false;

    const style = document.createElement('style');
    style.textContent = `view-json {
  --background-color:black;
  --color: yellow;
  --string-color: #2d2;
  --number-color: orange;
  --boolean-color: orange;
  --null-color: grey;
  --key-color: gray;
}`;
    div.appendChild(style);

    const a = document.createElement('a');
    const href = new URL(document.location);
    href.pathname = href.pathname.replace(/\.json/, '');
    a.href = href;

    a.textContent = 'HTML';
    div.appendChild(a);

    const viewJson = document.createElement('view-json');

    viewJson.setAttribute('no-parse', null);
    viewJson.textContent = '{}';
    div.appendChild(viewJson);

    return div;
  }
}
