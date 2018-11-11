import { Injectable } from '@angular/core';
import User from '../models/user';
import { ApiClientService } from './api-client.service';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import TVShow from '../models/tv-show';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _user: User;
  private userSubject = new Subject<User>();
  public user$ = this.userSubject.asObservable().pipe(
    map(user => {
      user.shows = user.shows.map(show => TVShow.from(show));
      return User.from(user);
    })
  );

  get user() {
    return this._user;
  }

  set user(newValue: User) {
    if (this._user !== newValue) {
      this.userSubject.next(newValue);
    }
    this._user = newValue;
  }

  constructor(private apiClient: ApiClientService) {
    this.apiClient.getUser().subscribe(user => {
      this.user = user;
    });
  }
}
