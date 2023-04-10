import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeasonComponent } from './views/season/season.component';
import { AppComponent } from './app.component';
import { RaceDetailComponent } from './views/race-detail/race-detail.component';

const routes: Routes = [
  {
    path: '',
    component: SeasonComponent
  },
  {
    path: 'seasons/:season',
    component: SeasonComponent
  },
  {
    path: 'seasons/:season/race/:raceId',
    component: RaceDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
