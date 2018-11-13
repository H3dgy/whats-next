import { Component, OnInit, Input } from '@angular/core';
import Show from 'src/app/models/show';
import { ApiClientService } from 'src/app/services/api-client.service';
import { Router } from '@angular/router';
import Tracking from 'src/app/interfaces/tracking';

@Component({
  selector: 'app-show-list-item',
  templateUrl: './show-list-item.component.html',
  styleUrls: ['./show-list-item.component.scss']
})
export class ShowListItemComponent implements OnInit {
  @Input()
  show: Show;
  status: string;

  constructor(private apiClient: ApiClientService, private router: Router) {}

  statusChanged(status: Tracking) {
    this.apiClient.postStatus(status).subscribe(show => {
      this.show = show;
      if (show.tracking.status !== '') this.router.navigateByUrl('my-shows');
    });
  }

  ngOnInit() {
    this.status = (this.show.tracking && this.show.tracking.status) || '';
  }
}
