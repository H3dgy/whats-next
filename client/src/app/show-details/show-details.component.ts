import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ApiClientService } from '../api-client.service';
import TVShow from '../tv-show';

@Component({
  selector: 'app-show-details',
  templateUrl: './show-details.component.html',
  styleUrls: ['./show-details.component.scss']
})
export class ShowDetailsComponent implements OnInit {
  show: TVShow;

  constructor(
    private client: ApiClientService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  goBack(): void {
    this.location.back();
  }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('showId');
    this.client
      .getTVShowDetails(id)
      .subscribe(show => (this.show = TVShow.from(show)));
  }
}
