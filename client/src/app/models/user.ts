import TVShow from './tv-show';

export default class User {
  id: number;
  name: string;
  email: string;
  seen: TVShow[];
  toSee: TVShow[];
}
