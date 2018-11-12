import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Status } from 'src/app/models/status';
import Tracking from 'src/app/interfaces/tracking';
import Show from 'src/app/models/show';

@Component({
  selector: 'app-track-show',
  templateUrl: './track-show.component.html',
  styleUrls: ['./track-show.component.scss']
})
export class TrackShowComponent implements OnInit {
  @Input()
  show: Show;
  @Output()
  statusClick: EventEmitter<Tracking> = new EventEmitter<Tracking>();
  status: string;

  ngOnInit() {
    this.status = (this.show.tracking && this.show.tracking.status) || '';
  }

  statusClicked(): void {
    this.statusClick.emit({
      showId: this.show.id,
      status: this.toggle()
    });
  }

  toggle() {
    this.status = this.status !== 'SEEN' ? Status.seen : Status.noStatus;
    return this.status;
  }
}
