import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import TVShow from '../models/tv-show';
import User from '../models/user';
import SearchResult from '../models/search-result';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {
  baseUrl = environment.serverUrl;

  constructor(private http: HttpClient) {}

  getUser(): Observable<User> {
    return this.http
      .get<User>(`${this.baseUrl}/user`)
      .pipe(map(data => Object.assign(new User(), data)));
  }

  getRecommendedShows(): Observable<TVShow[]> {
    return this.http
      .get<TVShow[]>(`${this.baseUrl}/recommended`)
      .pipe(map(data => data.map(show => TVShow.from(show))));
  }

  getTVShowDetails(id: number): Observable<TVShow> {
    return this.http.get<TVShow>(`${this.baseUrl}/shows/${id}`);
  }

  addSeen(id: number): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/user/${id}/seen`, '');
  }

  addToSee(id: number): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/user/${id}/toSee`, '');
  }

  removeSeen(id: number): Observable<User> {
    return this.http.delete<User>(`${this.baseUrl}/user/${id}/seen`);
  }

  removeToSee(id: number): Observable<User> {
    return this.http.delete<User>(`${this.baseUrl}/user/${id}/toSee`);
  }

  searchTerm(term: string): Observable<SearchResult[]> {
    return this.http.post<SearchResult[]>(`${this.baseUrl}/shows/search`, {
      term
    });
  }
}
