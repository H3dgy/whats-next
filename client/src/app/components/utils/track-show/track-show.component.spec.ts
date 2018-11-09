import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackShowComponent } from './track-show.component';

describe('TrackShowComponent', () => {
  let component: TrackShowComponent;
  let fixture: ComponentFixture<TrackShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
