import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecommendationsComponent } from './recommendations/recommendations.component';
import { MyTvShowsComponent } from './my-tv-shows/my-tv-shows.component';

@NgModule({
  declarations: [
    AppComponent,
    RecommendationsComponent,
    MyTvShowsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
