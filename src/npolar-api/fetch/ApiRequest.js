import {npolarApiBase} from '../npolarApiBase.js';
//import {LocalUser} from '../LocalUser.js';
import {Base64} from '../../util/Base64.js';

export class ApiRequest extends window.Request {

  static appendStandardHeaders(init) {
    if (!init) {
      init = {};
    }
    if (!('headers' in init)) {
      init.headers = new Headers();
    }
    if (!init.headers.has('Authorization')) {
      const bearerToken = ApiRequest.bearerToken();
      if (bearerToken) {
        // @todo validate token
        init.headers.append('Authorization', `Bearer ${bearerToken}`);
      }
    }
    if (!init.headers.has('Accept')) {
      init.headers.append('Accept', 'application/json');
    }
    return init;
  }


  static bearerToken() {
    //return LocalUser.jwt();
  }

  static basicToken(username, password) {
    return Base64.encode(`${username}:${password}`);
  }


  static basicAuthorization(username, password) {
    const headers = new Headers();
    if (password && password.length > 0 && username && username.length > 0) {
      headers.append('Authorization', `Basic ${ApiRequest.basicToken(username, password)}`);
    } else {
      console.warn('Cannot use basic auth without username and password');
    }
    return headers;
  }

  // static validResponse(response) {
  //   return response;
  // }

  constructor(url='/', init={ base: npolarApiBase}) {
    url = new URL(url, init.base); //// In particular, this is wise if the input url is a relative path :)
    init = ApiRequest.appendStandardHeaders(init);
    super(url, init);
  }

  static base() {
    return npolarApiBase;
  }

  static async get(path) {
    const request = new ApiRequest(path);
    return fetch(request)
      .then(r => (r.status === 200) ? Promise.resolve(r) : Promise.reject(r))
      .then(r => r.json())
    ;
  }


  static async feed(path, params) {
    params = Object.assign(ApiRequest.defaultFeedParams(), params);
      // todo, remove sort on latest if there is a query and no user-provided sort...
      // if (params.q.length > 0) {
      //   delete params.sort;
      // }
    const search = '?'+Object.entries(params).map((p) => `${p[0]}=${p[1]}`).join("&");
    const url = `${path}${search}`;
    return ApiRequest.get(url);
  }

  static defaultFeedParams() {
    return { q: '',
      limit: 20,
      format: 'json',
      variant: 'atom',
      facets: false,
      'facet.variant': 'tuple'
    };
  }
}
