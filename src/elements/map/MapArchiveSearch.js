import {ApiRequest} from '../../npolar-api/fetch/ApiRequest.js';
import {npolarApiBase} from '../../npolar-api/npolarApiBase.js';
import {mapArchiveBase} from './mapArchiveBase.js';
import {mapImageCard} from './mapImageCard.js';
import {searchParams} from '../../browser/searchParams.js';

export class MapArchiveSearch extends HTMLElement {

  static localName() {
    return 'map-archive-search';
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `<news-band api="${mapArchiveBase}" heading="Map archive"></news-band>
    <input placeholder="Map archive search" type="search"><button>Search</button>`;

    this.search();

    this.querySelector('input').addEventListener('change', (evt)=>{
      const q = evt.target.value;
      history.replaceState(null, null, `?q=${q}`);
      this.search();
    });
    this.querySelector('button').addEventListener('click', (evt)=>{
      const q = this.querySelector('input').value;
      history.replaceState(null, null, `?q=${q}`);
      this.search();
    });
  }

  search() {
    ApiRequest.search(mapArchiveBase, this.searchParams()).then(maps => {
      this.maps = maps;
    });
  }

  set maps(maps) {
    // clear current cards, thanks https://developer.mozilla.org/en-US/docs/Web/API/Node/childNodes
    const ica = this.imageCardArea();
    while (ica.firstChild) {
      ica.removeChild(ica.firstChild);
    }
    maps.forEach(map => {
      this.imageCardArea().appendChild(mapImageCard(map));
    });
  }

  searchParams(params=searchParams()) {
    const dflt = { q:'', limit: '12', variant: 'array', fields: 'id,_rev,title,files,publication.year', sort: '-created' };
    if ('q' in params && params.q.length > 0) {
      delete dflt.sort;
    }
    params = Object.assign(dflt,params);
    console.log(params);
    return params;
  }

  imageCardArea() {
    let cardArea = this.querySelector('card-band');
    if (cardArea) {
      return cardArea;
    } else {
      cardArea=document.createElement('card-band');
      return this.appendChild(cardArea);
    }
  }

}
