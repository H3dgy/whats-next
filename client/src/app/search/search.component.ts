import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchText = '';

  constructor() {}

  ngOnInit() {
    let inputElm = document.getElementById('searchTextField');
    fromEvent(inputElm, 'keyup')
      .pipe(
        debounceTime(500),
        filter(() => this.searchText.length > 2)
      )
      .subscribe(() => {
        console.log(this.searchText);
      });
  }
}
