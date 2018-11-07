import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import TVShow from './tv-show';

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {
  baseUrl = environment.serverUrl;

  constructor(private http: HttpClient) {}

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
    return this.http.post<void>(`${this.baseUrl}/shows/${id}/2see`, '');
  }
}
