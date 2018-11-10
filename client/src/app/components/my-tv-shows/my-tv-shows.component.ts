import { Component, OnInit } from '@angular/core';
import TVShow from '../../models/tv-show';
import { UserService } from 'src/app/services/user.service';
import { ApiClientService } from 'src/app/services/api-client.service';
import User from 'src/app/models/user';

@Component({
  selector: 'app-my-tv-shows',
  templateUrl: './my-tv-shows.component.html',
  styleUrls: ['./my-tv-shows.component.scss']
})
export class MyTvShowsComponent implements OnInit {
  seen: TVShow[] = [];
  toSee: TVShow[] = [];
  user: User;

  constructor(
    private userService: UserService,
    private apiClient: ApiClientService
  ) {}

  ngOnInit() {
    this.userService.user$.subscribe(user => {
      console.log('user set on my tv shows');
      this.user = user;
    });

    this.apiClient.getUser().subscribe(user => {
      console.log('calling get user');
      user.seen = user.seen.map(show => TVShow.from(show));
      user.toSee = user.toSee.map(show => TVShow.from(show));
      this.user = user;
      this.userService.user = user;
    });
  }
}
