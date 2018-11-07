import { Component, OnInit } from '@angular/core';
import { ApiClientService } from '../api-client.service';
import TVShow from '../tv-show';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.scss']
})
export class RecommendationsComponent implements OnInit {
  shows: TVShow[];
  userId: number;
  constructor(private apiClient: ApiClientService) {}

  getRecommendations(): void {
    this.apiClient
      .getRecommendedShows()
      .subscribe(shows => (this.shows = shows.map(show => TVShow.from(show))));
  }

  ngOnInit() {
    this.getRecommendations();
  }
}
