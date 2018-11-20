import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import AuthInfo from '../interfaces/authinfo';
import LogInInfo from '../interfaces/logininfo';
import SignInInfo from '../interfaces/signininfo';
import User from '../models/user';
import { ApiClientService } from './api-client.service';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import Show from '../models/show';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = 'http://localhost:4000'
  private _user: User;
  private userSubject = new Subject<User>();
  public user$ = this.userSubject.asObservable().pipe(
    map(user => {
      user.shows = user.shows.map(show => Show.from(show));
      return User.from(user);
    })
  );
  public userLoggedIn: Subject<boolean> = new Subject<boolean>();

  get user() {
    return this._user;
  }

  set user(newValue: User) {
    if (this._user !== newValue) {
      this.userSubject.next(newValue);
    }
    this._user = newValue;
  }

  constructor(private apiClient: ApiClientService, private http: HttpClient) {
    this.apiClient.getUser().subscribe(user => {
      this.user = user;
    });
  }


  login(info: LogInInfo): Observable<boolean> {
    return this.http
      .post<boolean>(`${this.baseUrl}/login`, info);
  }

  signin(info: SignInInfo): Observable<boolean> {
    return this.http
      .post<boolean>(`${this.baseUrl}/signin`, info);
  }

  auth(info: AuthInfo): Observable<boolean> {
    return this.http
      .post<boolean>(`${this.baseUrl}/auth`, info);
  }

  isLoggedIn(): Observable<boolean> {
    const tokenNumber: string = localStorage.getItem('token');
    return this.http
    .post<boolean>(`${this.baseUrl}/isloggedin`,{token: tokenNumber} );
  }

  setUser() {
    // Send info to the backend
    localStorage.setItem('token', '12345');
    this.userLoggedIn.next(true);
  }
}
