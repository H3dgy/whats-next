import { Component, Input, OnInit } from '@angular/core';
import TVShow from 'src/app/models/tv-show';
import { ApiClientService } from 'src/app/services/api-client.service';
import Tracking from 'src/app/interfaces/tracking';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-show-list-item',
  templateUrl: './show-list-item.component.html',
  styleUrls: ['./show-list-item.component.scss']
})
export class ShowListItemComponent implements OnInit {
  @Input()
  show: TVShow;
  status: string;

  constructor(
    private apiClient: ApiClientService,
    private userService: UserService
  ) {}

  statusChanged(status: Tracking) {
    this.apiClient
      .postStatus(status)
      .subscribe(user => (this.userService.user = user));
  }

  ngOnInit() {
    this.status = (this.show.tracking && this.show.tracking.status) || '';
  }
}
