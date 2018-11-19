import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecommendationsComponent } from './components/recommendations/recommendations.component';
import { MyShowsComponent } from './components/my-shows/my-shows.component';
import { SearchComponent } from './components/search/search.component';
import { ShowDetailsComponent } from './components/show-details/show-details.component';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: 'main', component: MainComponent },
  { path: 'login', component: LoginComponent },
  { path: 'recommendations', component: RecommendationsComponent },
  { path: 'my-shows', redirectTo: 'my-shows/toSee' },
  { path: 'my-shows/toSee', component: MyShowsComponent },
  { path: 'my-shows/seeing', redirectTo: 'my-shows/toSee' },
  { path: 'my-shows/seen', component: MyShowsComponent },
  { path: 'my-shows/:showId', component: ShowDetailsComponent },
  { path: 'search', component: SearchComponent },
  { path: 'shows/:showId', component: ShowDetailsComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
