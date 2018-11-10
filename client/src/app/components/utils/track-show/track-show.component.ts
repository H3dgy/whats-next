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
    public userService: UserService
  ) {}

  toSee(showId) {
    if (!this.isSeen) {
      this.apiClient
        .addToSee(showId)
        .subscribe(user => (this.userService.user = user));
    } else {
      this.apiClient
        .removeSeen(showId)
        .subscribe(user => (this.userService.user = user));
    }
  }

  seen(showId) {
    if (!this.seen) {
      this.apiClient
        .addSeen(showId)
        .subscribe(user => (this.userService.user = user));
    } else {
      this.apiClient
        .removeSeen(showId)
        .subscribe(user => (this.userService.user = user));
    }
  }

  ngOnInit() {
    if (!this.userService.user) {
      this.apiClient.getUser().subscribe(user => {
        this.userService.user = user;
        this.isSeen = this.userService.user.isSeen(this.showId);
        this.isToSee = this.userService.user.isToSee(this.showId);
      });
    } else {
      this.isSeen = this.userService.user.isSeen(this.showId);
      this.isToSee = this.userService.user.isToSee(this.showId);
    }
  }
}
