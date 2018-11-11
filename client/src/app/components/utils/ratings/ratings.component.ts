import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import Tracking from 'src/app/interfaces/tracking';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.scss']
})
export class RatingsComponent implements OnInit {
  @Input()
  rating: number;
  @Input()
  showId: number;
  @Output()
  ratingClick: EventEmitter<Tracking> = new EventEmitter<Tracking>();

  inputName: string;

  ngOnInit() {
    this.inputName = this.showId + '_rating';
  }

  ratingClicked(rating: number): void {
    this.rating = rating;
    this.ratingClick.emit({
      showId: this.showId,
      rating: rating
    });
  }
}
