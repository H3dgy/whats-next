import { Component, OnInit } from '@angular/core';
import Show from '../../models/show';
import { UserService } from 'src/app/services/user.service';
import { ApiClientService } from 'src/app/services/api-client.service';
import User from 'src/app/models/user';
import { Status } from 'src/app/models/status';

@Component({
  selector: 'app-my-tv-shows',
  templateUrl: './my-tv-shows.component.html',
  styleUrls: ['./my-tv-shows.component.scss']
})
export class MyTvShowsComponent implements OnInit {
  seen: Show[] = [];
  toSee: Show[] = [];
  user: User;

  constructor(
    private userService: UserService,
    private apiClient: ApiClientService
  ) {}

  ngOnInit() {
    this.userService.user$.subscribe(user => {
      this.user = user;
      const shows = user.shows.reduce(
        (acc, el) => acc[el.tracking.status].push(el) && acc,
        { [Status.toSee]: [], [Status.seen]: [], [Status.noStatus]: [] }
      );
      this.seen = shows[Status.seen];
      this.toSee = shows[Status.toSee];
    });

    this.apiClient.getUser().subscribe(user => {
      this.user = user;
      this.userService.user = user;
    });
  }
}
