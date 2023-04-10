import { Component } from '@angular/core';
import { Seasons } from './constants/seasons.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'RxF1';

  public readonly seasonList = [
    Seasons.year2018,
    Seasons.year2019,
    Seasons.year2020,
    Seasons.year2021,
    Seasons.year2022
  ];
  public selectedSeason = '';

  constructor() {}
}
