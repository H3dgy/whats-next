import { Status } from '../models/status';

export default interface Tracking {
  showId: number;
  rating?: number;
  status?: Status;
}
