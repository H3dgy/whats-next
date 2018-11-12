import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackToSeeComponent } from './track-to-see.component';

describe('TrackSeenComponent', () => {
  let component: TrackToSeeComponent;
  let fixture: ComponentFixture<TrackToSeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TrackToSeeComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackToSeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
