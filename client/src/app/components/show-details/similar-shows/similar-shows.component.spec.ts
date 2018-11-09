import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimilarShowsComponent } from './similar-shows.component';

describe('SimilarShowsComponent', () => {
  let component: SimilarShowsComponent;
  let fixture: ComponentFixture<SimilarShowsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimilarShowsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimilarShowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
