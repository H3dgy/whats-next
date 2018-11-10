import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ApiClientService } from '../../services/api-client.service';
import TVShow from '../../models/tv-show';

@Component({
  selector: 'app-show-details',
  templateUrl: './show-details.component.html',
  styleUrls: ['./show-details.component.scss']
})
export class ShowDetailsComponent {
  show: TVShow;
  similarShows: TVShow[];

  constructor(
    private client: ApiClientService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.route.url.subscribe(() => this.updateDetails());
  }

  goBack(): void {
    this.location.back();
  }

  updateDetails() {
    const id = +this.route.snapshot.paramMap.get('showId');
    this.client.getTVShowDetails(id).subscribe(show => {
      this.show = TVShow.from(show);
      this.similarShows = this.show.similar.map(show => TVShow.from(show));
      this.show.vote_average = Math.round(this.show.vote_average / 2);
    });
  }
}