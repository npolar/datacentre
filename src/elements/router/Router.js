import pathToRegexp from './pathToRegexp.js';

// A dead-simple router that binds routes to a custom element
// Whenever the On route changes (UR)
export class Router {

  constructor({ routes,
    element = document.querySelector('datacentre-router'),
    url = new URL(document.location)} = {}) {

    this.element = element;

    this.routes = routes;

    // Listen to changes in the app attribute
    //const self = this;
    this.setupListeners();

    // Set default app (normally for "/", but defined by the first route)
    //try {

      const path = document.location.pathname;
      const defaultRoute = this.routes[0];
      if (defaultRoute.path === path && this.app === null) {
        this.app = defaultRoute.localName;
      } else {
        const url = new URL(document.location);
        try {
          this.app = this.localName(url); //luckily this === self here :)
        } catch (e) {

          const element = document.querySelector('datacentre-error');
          element.textContent = e;
        }
      }
    //} catch (e) {

      // const element = document.createElement('datacentre-error');
      // const error = new DError({ error: "error", e, element});
      //
      // console.error(error);
      //
      // this.app = 'datacentre-error';
      //this.path = '/error';
    //}
  }

  setupListeners(self=this) {
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if ('attributes' === mutation.type && 'app' === mutation.attributeName) {
          if (self.app !== mutation.oldValue) {
            self.injectApp(self.app, mutation.oldValue); // here self is not "this" class
          }
        } else {
          console.warn('Unhandled mutation:', mutation);
        }
      });
    });
    observer.observe(this.element, { attributes: true,
      attributeOldValue: true,
      attributeFilter: ['app']
    });

    window.addEventListener('popstate', (event) => {

      const url = new URL(document.location);
      if (this.app !== this.localName(url)) {
        this.app = this.localName(url); //luckily this === self here :)
      }

    });
  }

  get app() {
    return this.element.getAttribute('app');
  }

  set app(localName) {
    this.element.setAttribute('path',this.route(localName).path);
    this.element.setAttribute('app', localName);

  }

  set path(path) {
    // First translate path to localName (to trigger app-switch)
    console.log(path);
    const url = new URL(path);
    const localName = this.localName(url);
    if (localName !== this.app) {
      this.app = localName;
    }
    // push?
    this.element.setAttribute('path', path);
  }

  appFactory(localName, element, template) {
    const route = this.route(localName);
    const k = route.class;

    if (template) {
      return new k({ template });
    } else {
      return new k();
    }
  }

  injectApp(localName,previousName) {
    console.log('injectApp', localName, previousName);
    let template = document.querySelector(`template#${localName}`);
    if (template) {
      template = template.content;
    }
    let element = this.element.querySelector(localName);

    if (!element) {
      element = this.appFactory(localName, element, template);
    }
    const datacentreMain = document.querySelector('datacentre-main');

    const previousElement = document.querySelector(previousName);

    if (!previousElement) {
      if (element instanceof HTMLElement) {
        datacentreMain.appendChild(element);
      } else {
        datacentreMain.appendChild(element.element);
      }
    } else {
      if (element instanceof HTMLElement) {
        datacentreMain.replaceChild(element, previousElement);
      } else {
        datacentreMain.replaceChild(element.element, previousElement);
      }
    }
  }

  localName(url) {
    let path = url.pathname;
    // Remove trailing / except wheen the path is just /
    if (path.length > 1) {
      path = path.replace(/\/$/, '');
    }
    // Exact match?
    let route = this.routes.find(r => path === r.path);

    // RegExp
    if (!route) {
      const longestRouteFirst = this.routes.sort((a,b) => {
        return (b.path.length - a.path.length);
      });

      route = longestRouteFirst.find(r => {
        const re = pathToRegexp(r.path);
        return re.test(path);
      });
    }
    if (!route) {
      throw new Error(`No matching application element for ${path}`);
    }
    console.debug(route);
    return route.localName;
  }

  path(localName) {
    return this.route(localName).path;
  }

  route(localName) {
    const route = this.routes.find(r => localName === r.localName);
    if (!route) {
      throw new Error(`No route for element <${localName}>`);
    }
    return route;
  }

  get routes() {
    return this._routes;
  }

  set routes(routes) {
    return this._routes = routes;
  }

}
