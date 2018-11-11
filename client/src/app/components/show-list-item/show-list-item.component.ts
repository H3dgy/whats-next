import { Component, Input, OnInit } from '@angular/core';
import TVShow from 'src/app/models/tv-show';

@Component({
  selector: 'app-show-list-item',
  templateUrl: './show-list-item.component.html',
  styleUrls: ['./show-list-item.component.scss']
})
export class ShowListItemComponent implements OnInit {
  @Input()
  show: TVShow;
  status: string;

  statusChanged(e) {
    console.log(e);
  }

  ngOnInit() {
    this.status = (this.show.tracking && this.show.tracking.status) || '';
  }
}
