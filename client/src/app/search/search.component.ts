import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';
import { ApiClientService } from '../api-client.service';
import SearchResult from '../search-result';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchText = '';
  results: SearchResult[] = [];

  constructor(private apiClient: ApiClientService) {}

  ngOnInit() {
    let inputElm = document.getElementById('searchTextField');
    fromEvent(inputElm, 'keyup')
      .pipe(
        debounceTime(500),
        filter(() => this.searchText.length > 2)
      )
      .subscribe(() => {
        this.apiClient
          .searchTerm(this.searchText)
          .subscribe(results => (this.results = results));
      });
  }
}
