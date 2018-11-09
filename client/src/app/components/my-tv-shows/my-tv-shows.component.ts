import { Component, OnInit } from '@angular/core';
import TVShow from '../../models/tv-show';
import { UserService } from 'src/app/services/user.service';
import { ApiClientService } from 'src/app/services/api-client.service';

@Component({
  selector: 'app-my-tv-shows',
  templateUrl: './my-tv-shows.component.html',
  styleUrls: ['./my-tv-shows.component.scss']
})
export class MyTvShowsComponent implements OnInit {
  seen: TVShow[] = [];
  toSee: TVShow[] = [];

  constructor(
    private userService: UserService,
    private apiClient: ApiClientService
  ) {}

  ngOnInit() {
    this.apiClient.getUser().subscribe(user => {
      user.seen = user.seen.map(show => TVShow.from(show));
      user.toSee = user.toSee.map(show => TVShow.from(show));
      this.userService.user = user;
      this.seen = user.seen;
      this.toSee = user.toSee;
    });
  }
}
