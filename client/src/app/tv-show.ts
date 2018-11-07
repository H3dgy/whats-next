import { environment } from '../environments/environment';

const imagesUrl = environment.imagesBaseUrl;
const bdSize = environment.backdropSizes[0];

export default class TVShow {
  showId: number;
  name: string;
  backdrop_path: string;
  poster_path: string;

  constructor(show: object) {
    Object.assign(this, show);
  }

  get image() {
    return `${imagesUrl}/${bdSize}/${this.backdrop_path}`;
  }
}
