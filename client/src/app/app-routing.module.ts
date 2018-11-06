import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecommendationsComponent } from './recommendations/recommendations.component';

const routes: Routes = [
  { path: 'recommendations', component: RecommendationsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
