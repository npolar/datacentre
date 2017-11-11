import {JsonPresenter} from './JsonPresenter.js';
import {extractName} from '../../json-ld/extractName.js';
export class HtmlPresenter extends JsonPresenter {


  set d(d) {
    const article = this.querySelector('article');
    const div = document.createElement('div');
    article.appendChild(div);
    div.textContent = extractName(d);
  }

  template() {
    const article =  document.createElement('article');

    const a = document.createElement('a');
    const href = new URL(document.location);
    href.pathname += '.json';
    a.href = href;
    a.textContent = 'JSON';
    article.appendChild(a);

    return article;


  }
}
