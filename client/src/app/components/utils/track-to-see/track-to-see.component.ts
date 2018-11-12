import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnChanges
} from '@angular/core';
import { Status } from 'src/app/models/status';
import Tracking from 'src/app/interfaces/tracking';
import Show from 'src/app/models/show';

@Component({
  selector: 'app-track-to-see',
  templateUrl: './track-to-see.component.html',
  styleUrls: ['./track-to-see.component.scss']
})
export class TrackToSeeComponent {
  @Input()
  show: Show;
  @Output()
  statusClick: EventEmitter<Tracking> = new EventEmitter<Tracking>();
  status: string;

  statusClicked(): void {
    this.statusClick.emit({
      showId: this.show.id,
      status: this.toggle()
    });
  }

  toggle() {
    this.status = this.status !== 'TOSEE' ? Status.toSee : Status.noStatus;
    return this.status;
  }
}
