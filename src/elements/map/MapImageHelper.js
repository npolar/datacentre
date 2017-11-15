import {mapArchiveBase} from './mapArchiveBase.js';

export class MapImageHelper {

  constructor() {
    this.jpeg = mapArchiveBase+'-jpeg';
  }

  basename(filename) {
    return filename.split(/\..*$/)[0];
  }

  preview(id,filename) {
    return `${mapArchiveBase}-jpeg/${id}/_file/${this.basename(filename)}-512px.jpeg`;
  }
}
