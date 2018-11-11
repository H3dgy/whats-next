import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecommendationsComponent } from './components/recommendations/recommendations.component';
import { MyShowsComponent } from './components/my-shows/my-shows.component';
import { SearchComponent } from './components/search/search.component';
import { ShowDetailsComponent } from './components/show-details/show-details.component';

const routes: Routes = [
  { path: 'recommendations', component: RecommendationsComponent },
  { path: 'my-shows', redirectTo: 'my-shows/toSee', pathMatch: 'full' },
  { path: 'my-shows/toSee', component: MyShowsComponent, pathMatch: 'full' },
  { path: 'my-shows/seeing', redirectTo: 'my-shows/toSee', pathMatch: 'full' },
  { path: 'my-shows/seen', component: MyShowsComponent, pathMatch: 'full' },
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
