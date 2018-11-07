import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecommendationsComponent } from './recommendations/recommendations.component';
import { MyTvShowsComponent } from './my-tv-shows/my-tv-shows.component';
import { ShowDetailsComponent } from './show-details/show-details.component';

const routes: Routes = [
  { path: ':userId/recommendations', component: RecommendationsComponent },
  { path: ':userId/my-tv-shows', component: MyTvShowsComponent },
  { path: 'shows/:showId', component: ShowDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
