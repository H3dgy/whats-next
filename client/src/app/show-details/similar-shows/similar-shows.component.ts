import { Component, OnInit, Input } from '@angular/core';
import TVShow from 'src/app/tv-show';

@Component({
  selector: 'app-similar-shows',
  templateUrl: './similar-shows.component.html',
  styleUrls: ['./similar-shows.component.scss']
})
export class SimilarShowsComponent implements OnInit {
  @Input()
  show: TVShow;

  constructor() {}

  ngOnInit() {}
}
