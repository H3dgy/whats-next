import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Status } from 'src/app/models/status';
import Tracking from 'src/app/interfaces/tracking';

@Component({
  selector: 'app-track-show',
  templateUrl: './track-show.component.html',
  styleUrls: ['./track-show.component.scss']
})
export class TrackShowComponent implements OnInit {
  @Input()
  showId: number;
  @Output()
  statusClick: EventEmitter<Tracking> = new EventEmitter<Tracking>();

  ngOnInit() {}

  statusClicked(statusStr: string): void {
    this.statusClick.emit({ showId: this.showId, status: Status[statusStr] });
  }
}
