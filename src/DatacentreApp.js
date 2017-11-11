import {Router} from './elements/router/Router.js';

import {JsonPresenter} from './elements/presenter/JsonPresenter.js';
import {HtmlPresenter} from './elements/presenter/HtmlPresenter.js';

import {ApiRequest} from './npolar-api/fetch/ApiRequest.js';

customElements.define('json-presenter', JsonPresenter);
customElements.define('html-presenter', HtmlPresenter);

class Home extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<article>Welcome to the next data.npolar.no (v3)
  <p>Try <ul>
    <li><a href="/dataset/ae1a945b-6b91-42c0-86e6-4657b4b6ec3c">DCAT metadata HTML  </a></li>
    <li><a href="/dataset/ae1a945b-6b91-42c0-86e6-4657b4b6ec3c.json">DCAT metadata in JSON</a></li>
  </ul>
  </p>
</article>`;
  }
}
customElements.define('datacentre-home', Home);

async function datacentreRoutes() {
// Routes: a route binds a path to a class (typically a custom HTMLElement)
// Routes = static routes for datacentre applications
// + dynamic routes providing generic views for all Npolar APIs
//
// Simple, express-style routes like '/dataset' are converted to regexes prior to matching by the Router
// (See http://forbeslindesay.github.io/express-route-tester/ for a route testing tool)
// @return Promise.Array<Object>


  // Static routes
  let routes = [
    { path: '/', localName: 'datacentre-home', class: Home },
  ];

  // Add dynamic routes

  const serviceAllPaths = `/service/_all?fields=path`;
  let p;

  if (p=localStorage.getItem('serviceAllPaths')) {
    // @todo rewrite to reject if cache is >= 1d?
    p = Promise.resolve(JSON.parse(p).services);
  } else {
    const isodate = new Date().toJSON().split('T')[0];
    p = ApiRequest.get(`${serviceAllPaths}&rev=${isodate}`);
    p.then(services => {
      localStorage.setItem('serviceAllPaths', JSON.stringify({updated: isodate, services }));
    })
  }

  return p.then(services => {
      services.filter(s => /*@todo*/true).forEach(api => {

        // Generic HTML and JSON views
        if (!routes.find(r => r.path === api.path+'/:id')) {
          routes.push({ path: api.path+'/:id', localName: 'html-presenter', class: HtmlPresenter });
        }
        routes.push({ path: api.path+'/:id.html', localName: 'html-presenter', class: HtmlPresenter });
        routes.push({ path: api.path+'/:id.json', localName: 'json-presenter', class: JsonPresenter });

    });
    return routes;
  });

}

export class DatacentreApp extends HTMLElement {

  connectedCallback() {
    datacentreRoutes().then(routes => {
      new Router({routes});
    });
  }


}
customElements.define('datacentre-app', DatacentreApp);
