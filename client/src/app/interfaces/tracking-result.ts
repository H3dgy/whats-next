import User from '../models/user';
import Show from '../models/show';

export default interface TrackingResult {
  user: User;
  show: Show;
}
