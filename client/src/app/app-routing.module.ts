import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecommendationsComponent } from './recommendations/recommendations.component';
import { MyTvShowsComponent } from './my-tv-shows/my-tv-shows.component';

const routes: Routes = [
  { path: ':userId/recommendations', component: RecommendationsComponent },
  { path: ':userId/my-tv-shows', component: MyTvShowsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
