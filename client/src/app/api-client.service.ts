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

  getRecommendedShows(userId: number): Observable<TVShow[]> {
    console.log('hi');

    return this.http.get<TVShow[]>(`${this.baseUrl}/${userId}/recommended`);
  }
}
