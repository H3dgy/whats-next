import { Component, OnInit } from '@angular/core';
import { ApiClientService } from '../../services/api-client.service';
import TVShow from '../../models/tv-show';
import { UserService } from 'src/app/services/user.service';
import User from 'src/app/models/user';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.scss']
})
export class RecommendationsComponent implements OnInit {
  shows: TVShow[];

  constructor(
    private apiClient: ApiClientService,
    private userService: UserService
  ) {}

  getRecommendations(): void {
    this.apiClient.getRecommendedShows().subscribe(shows => {
      this.shows = shows;
    });
  }

  ngOnInit() {
    this.userService.user$.subscribe(() => {
      this.shows = this.shows;
    });
    this.getRecommendations();
  }
}
