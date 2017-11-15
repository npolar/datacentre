import {ImageCard} from '../card/ImageCard.js';
import {npolarApiBase} from '../../npolar-api/npolarApiBase.js';
import {MapImageHelper} from './MapImageHelper.js';
import {mapArchiveBase} from './mapArchiveBase.js';

export function mapImageCard(m) {
  const card = new ImageCard();
  const imageHelper = new MapImageHelper();

  card.heading = `${m.title||''} (${m.publication.year})`;
  if (m.files && m.files.length > 0) {
    let image = m.files.find(f => f.type === 'image/png');
    if (!image) {
      image = m.files.find(f => (/^image\//).test(f.type));
    }
    if (image) {
      card.image = npolarApiBase + imageHelper.preview(m.id, image.filename);
    }

  }
  card.href = `${mapArchiveBase}/${m.id}?rev=${m._rev}`;
  return card;
}
