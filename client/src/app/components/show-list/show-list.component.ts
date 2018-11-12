import { Component, Input, OnInit } from '@angular/core';
import Show from 'src/app/models/show';
import Tracking from 'src/app/interfaces/tracking';

@Component({
  selector: 'app-show-list',
  templateUrl: './show-list.component.html',
  styleUrls: ['./show-list.component.scss']
})
export class ShowListComponent implements OnInit {
  @Input()
  shows: Show;

  constructor() {}

  statusChanged(status: Tracking) {}

  ngOnInit() {}
}
