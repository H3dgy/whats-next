import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackSeenComponent } from './track-seen.component';

describe('TrackSeenComponent', () => {
  let component: TrackSeenComponent;
  let fixture: ComponentFixture<TrackSeenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TrackSeenComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackSeenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
