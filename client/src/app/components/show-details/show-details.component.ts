import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ApiClientService } from '../../services/api-client.service';
import TVShow from '../../models/tv-show';
import { UserService } from 'src/app/services/user.service';
import { log } from 'util';

@Component({
  selector: 'app-show-details',
  templateUrl: './show-details.component.html',
  styleUrls: ['./show-details.component.scss']
})
export class ShowDetailsComponent implements OnInit {
  show: TVShow;
  isTracking: boolean;

  constructor(
    private apiClient: ApiClientService,
    private userService: UserService,
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
      console.log('dafsdf');

      this.show = show;
      this.isTracking = this.userService.user.isTracking(this.show.tmdbId);
    });
  }

  movieRated(rating) {
    this.apiClient.postRating(rating).subscribe();
    console.log('rated! value:', rating);
  }

  ngOnInit() {
    this.updateDetails();
  }
}
