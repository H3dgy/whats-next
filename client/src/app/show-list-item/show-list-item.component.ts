import { Component, Input } from '@angular/core';
import TVShow from '../tv-show';

@Component({
  selector: 'app-show-list-item',
  templateUrl: './show-list-item.component.html',
  styleUrls: ['./show-list-item.component.scss']
})
export class ShowListItemComponent {
  @Input()
  show: TVShow;
}
