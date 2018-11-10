import { Component, OnInit } from '@angular/core';
import { ApiClientService } from '../../services/api-client.service';
import TVShow from '../../models/tv-show';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.scss']
})
export class RecommendationsComponent implements OnInit {
  shows: TVShow[];
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