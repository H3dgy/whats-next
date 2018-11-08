import { Component, OnInit } from '@angular/core';
import { ApiClientService } from '../api-client.service';
import TVShow from '../tv-show';

@Component({
  selector: 'app-my-tv-shows',
  templateUrl: './my-tv-shows.component.html',
  styleUrls: ['./my-tv-shows.component.scss']
})
export class MyTvShowsComponent implements OnInit {
  seen: TVShow[];
  toSee: TVShow[];

  constructor(private apiClient: ApiClientService) {}

  getUser(): void {
    this.apiClient.getUser().subscribe(user => {
      this.seen = user.seen.map(show => TVShow.from(show));
      this.toSee = user.toSee.map(show => TVShow.from(show));
      console.log(!!this.toSee.length, !!this.seen.length);
    });
  }

  ngOnInit() {
    this.getUser();
  }
}
