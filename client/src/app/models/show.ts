import { environment } from 'src/environments/environment';
import Tracking from '../interfaces/tracking';

const imagesUrl = environment.imagesBaseUrl;
const bdSize = environment.backdropSizes[0];
const posterSize = environment.posterSizes[4];

export default class Show {
  tmdbId: number;
  name: string;
  backdrop_path: string;
  poster_path: string;
  vote_average: number;
  number_of_seasons: number;
  similar: Show[];
  recommendations: Show[];
  tracking?: Tracking;

  static from(show: object) {
    return Object.assign(new Show(), show);
  }

  get image() {
    return `${imagesUrl}/${bdSize}/${this.backdrop_path}`;
  }

  get poster() {
    return `${imagesUrl}/${posterSize}/${this.poster_path}`;
  }
}
