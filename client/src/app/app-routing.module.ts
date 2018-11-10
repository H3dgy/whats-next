import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecommendationsComponent } from './components/recommendations/recommendations.component';
import { MyTvShowsComponent } from './components/my-tv-shows/my-tv-shows.component';
import { SearchComponent } from './components/search/search.component';
import { ShowDetailsComponent } from './components/show-details/show-details.component';

const routes: Routes = [
  { path: 'recommendations', component: RecommendationsComponent },
  { path: 'my-tv-shows', component: MyTvShowsComponent },
  { path: 'search', component: SearchComponent },
  { path: 'shows/:showId', component: ShowDetailsComponent },
  { path: '', redirectTo: 'recommendations', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
