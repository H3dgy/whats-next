import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { ApiClientService } from '../../services/api-client.service';
import Show from '../../models/show';
import { UserService } from 'src/app/services/user.service';
import Tracking from 'src/app/interfaces/tracking';

@Component({
  selector: 'app-show-details',
  templateUrl: './show-details.component.html',
  styleUrls: ['./show-details.component.scss']
})
export class ShowDetailsComponent implements OnInit {
  show: Show;
  status: string;

  constructor(
    private apiClient: ApiClientService,
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
    this.apiClient.getTVShowDetails(id).subscribe(show => {
      this.show = show;
      this.status = (this.show.tracking && this.show.tracking.status) || '';
    });
  }

  movieRated(rating) {
    this.apiClient.postRating(rating).subscribe();
  }

  statusChanged(status: Tracking) {
    this.apiClient.postStatus(status).subscribe(show => {
      this.show = show;
    });
  }

  ngOnInit() {
    this.updateDetails();
  }
}
