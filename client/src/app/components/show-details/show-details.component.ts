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
  isTracking: boolean;
  status: string;

  constructor(
    private apiClient: ApiClientService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
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
      this.isTracking = this.userService.user.isTracking(this.show.tmdbId);
      this.status = (this.show.tracking && this.show.tracking.status) || '';
    });
  }

  movieRated(rating) {
    this.apiClient.postRating(rating).subscribe();
  }

  statusChanged(status: Tracking) {
    console.log('asdasd', status);
    this.apiClient.postStatus(status).subscribe(show => {
      this.show = show;
      if (show.tracking.status !== '') this.router.navigateByUrl('my-shows');
    });
  }

  ngOnInit() {
    this.updateDetails();
  }
}
