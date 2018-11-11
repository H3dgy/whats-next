import { Component, OnInit, Input } from '@angular/core';
import Show from 'src/app/models/show';

@Component({
  selector: 'app-similar-shows',
  templateUrl: './similar-shows.component.html',
  styleUrls: ['./similar-shows.component.scss']
})
export class SimilarShowsComponent implements OnInit {
  @Input()
  shows: Show[];

  constructor() {}

  ngOnInit() {}
}
