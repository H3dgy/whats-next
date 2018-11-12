import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShowListItemComponent } from './components/show-list/show-list.component';
import { SimilarShowsComponent } from './components/show-details/similar-shows/similar-shows.component';
import { RatingsComponent } from './components/utils/ratings/ratings.component';
import { SearchComponent } from './components/search/search.component';
import { RecommendationsComponent } from './components/recommendations/recommendations.component';
import { ShowDetailsComponent } from './components/show-details/show-details.component';
import { MyShowsComponent } from './components/my-shows/my-shows.component';
import { TrackShowComponent } from './components/utils/track-show/track-show.component';

@NgModule({
  declarations: [
    AppComponent,
    RecommendationsComponent,
    MyShowsComponent,
    ShowListItemComponent,
    ShowDetailsComponent,
    SimilarShowsComponent,
    TrackShowComponent,
    RatingsComponent,
    SearchComponent
  ],
  imports: [AppRoutingModule, BrowserModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
