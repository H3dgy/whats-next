import { Component, OnInit } from '@angular/core';
import Show from '../../models/show';
import { UserService } from 'src/app/services/user.service';
import { ApiClientService } from 'src/app/services/api-client.service';
import User from 'src/app/models/user';
import { Status } from 'src/app/models/status';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-my-shows',
  templateUrl: './my-shows.component.html',
  styleUrls: ['./my-shows.component.scss']
})
export class MyShowsComponent implements OnInit {
  shows: Show[] = [];
  user: User;
  private path: string;

  constructor(
    private userService: UserService,
    private apiClient: ApiClientService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.url.subscribe(e => {
      this.path = e[e.length - 1].path.toLowerCase();
      this.updateShows();
    });

    this.userService.user$.subscribe(user => {
      this.user = user;
      this.updateShows();
    });

    this.apiClient.getUser().subscribe(user => {
      this.user = user;
      this.userService.user = user;
    });
  }

  updateShows() {
    if (!this.user) return;
    this.shows = this.user.shows.filter(
      show => show.tracking.status.toLowerCase() === this.path
    );
  }

  movieRated(rating) {
    this.apiClient.postRating(rating).subscribe();
  }
}
