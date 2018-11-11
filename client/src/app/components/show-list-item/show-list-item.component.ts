import { Component, Input, OnInit } from '@angular/core';
import Show from 'src/app/models/show';
import { ApiClientService } from 'src/app/services/api-client.service';
import Tracking from 'src/app/interfaces/tracking';
import { UserService } from 'src/app/services/user.service';
import { log } from 'util';

@Component({
  selector: 'app-show-list-item',
  templateUrl: './show-list-item.component.html',
  styleUrls: ['./show-list-item.component.scss']
})
export class ShowListItemComponent implements OnInit {
  @Input()
  show: Show;
  status: string;

  constructor(
    private apiClient: ApiClientService,
    private userService: UserService
  ) {}

  statusChanged(status: Tracking) {
    this.apiClient.postStatus(status).subscribe(result => {
      console.log(result.show);
      this.userService.user = result.user;
      this.show = result.show;
    });
  }

  ngOnInit() {
    this.status = (this.show.tracking && this.show.tracking.status) || '';
  }
}
