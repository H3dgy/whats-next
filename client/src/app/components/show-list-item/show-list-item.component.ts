import { Component, Input, OnInit } from '@angular/core';
import Show from 'src/app/models/show';
import { ApiClientService } from 'src/app/services/api-client.service';
import Tracking from 'src/app/interfaces/tracking';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

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
    private userService: UserService,
    private router: Router
  ) {}

  statusChanged(status: Tracking) {
    this.apiClient.postStatus(status).subscribe(result => {
      this.userService.user = result.user;
      this.show = result.show;
      if (result.show.tracking.status !== '')
        this.router.navigateByUrl('my-tv-shows');
    });
  }

  ngOnInit() {
    this.status = (this.show.tracking && this.show.tracking.status) || '';
  }
}
