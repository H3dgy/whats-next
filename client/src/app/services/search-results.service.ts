import { Injectable } from '@angular/core';
import SearchResult from '../models/search-result';

@Injectable({
  providedIn: 'root'
})
export class SearchResultsService {
  searchText = '';
  results: SearchResult[] = [];

  constructor() {}
}
