import { Component, OnInit } from '@angular/core';
import { ApiClientService } from '../../services/api-client.service';
import Show from '../../models/show';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.scss']
})
export class RecommendationsComponent implements OnInit {
  shows: Show[];

  constructor(private apiClient: ApiClientService) {}

  getRecommendations(): void {
    this.apiClient.getRecommendedShows().subscribe(shows => {
      this.shows = shows;
    });
  }

  ngOnInit() {
    this.getRecommendations();
  }
}
