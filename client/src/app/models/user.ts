import TVShow from './tv-show';

export default class User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  seen: TVShow[];
  toSee: TVShow[];
  private get trackedShows() {
    return [...this.seen.map(s => s.tmdbId), ...this.toSee.map(s => s.tmdbId)];
  }

  isTracking(showId: number) {
    return this.trackedShows.includes(showId);
  }

  isSeen(showId: number) {
    return this.seen.map(s => s.tmdbId).includes(showId);
  }

  isToSee(showId: number) {
    return this.toSee.map(s => s.tmdbId).includes(showId);
  }
}
