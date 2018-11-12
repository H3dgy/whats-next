import Show from './show';

export default class User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  seen: Show[];
  toSee: Show[];
  shows: Show[];

  static from(user: User): User {
    return Object.assign(new User(), user);
  }
}
