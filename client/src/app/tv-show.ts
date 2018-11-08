import { environment } from '../environments/environment';

const imagesUrl = environment.imagesBaseUrl;
const bdSize = environment.backdropSizes[0];
const posterSize = environment.posterSizes[4];

export default class TVShow {
  tmdbId: number;
  name: string;
  backdrop_path: string;
  poster_path: string;
  similar: { results: TVShow[] };

  static from(show: object) {
    return Object.assign(new TVShow(), show);
  }

  get image() {
    return `${imagesUrl}/${bdSize}/${this.backdrop_path}`;
  }

  get poster() {
    return `${imagesUrl}/${posterSize}/${this.poster_path}`;
  }
}
