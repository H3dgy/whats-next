import { Component, Input } from '@angular/core';
import { ApiClientService } from 'src/app/api-client.service';

@Component({
  selector: 'app-track-show',
  templateUrl: './track-show.component.html',
  styleUrls: ['./track-show.component.scss']
})
export class TrackShowComponent {
  @Input()
  showId: number;

  constructor(private apiClient: ApiClientService) {}

  toSee(showId) {
    this.apiClient.markToSee(showId).subscribe();
    console.log('added to see showId', showId);
  }

  seen(showId) {
    this.apiClient.markAsSeen(showId).subscribe();
    console.log('added as seen showId', showId);
  }
}
