import { Component, Input, OnInit } from '@angular/core';
import { ApiClientService } from 'src/app/services/api-client.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-track-show',
  templateUrl: './track-show.component.html',
  styleUrls: ['./track-show.component.scss']
})
export class TrackShowComponent implements OnInit {
  @Input()
  showId: number;
  isSeen: boolean;
  isToSee: boolean;

  constructor(
    private apiClient: ApiClientService,
    private userService: UserService
  ) {}

  toSee(showId) {
    if (!this.userService.user.toSee.includes(showId)) {
      this.apiClient.markToSee(showId).subscribe();
    }
  }

  seen(showId) {
    if (!this.userService.user.seen.includes(showId)) {
      this.apiClient.markAsSeen(showId).subscribe();
    }
  }

  ngOnInit() {
    const seenIds = this.userService.user.seen.map(sh => sh.tmdbId);
    const toSeeIds = this.userService.user.toSee.map(sh => sh.tmdbId);
    this.isSeen = seenIds.includes(this.showId);
    this.isToSee = toSeeIds.includes(this.showId);
  }
}
