import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    return this.http.get<User>(`${this.baseUrl}/user`);
  }

  getRecommendedShows(): Observable<TVShow[]> {
    return this.http.get<TVShow[]>(`${this.baseUrl}/recommended`);
  }

  getTVShowDetails(id: number): Observable<TVShow> {
    return this.http.get<TVShow>(`${this.baseUrl}/shows/${id}`);
  }

  markAsSeen(id: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/shows/${id}/seen`, '');
  }

  markToSee(id: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/shows/${id}/toSee`, '');
  }

  searchTerm(term: string): Observable<SearchResult[]> {
    return this.http.post<SearchResult[]>(`${this.baseUrl}/shows/search`, {
      term
    });
  }
}
