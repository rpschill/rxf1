import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DriversDataSource } from 'src/app/stores/drivers.datasource';

@Component({
  selector: 'app-season',
  templateUrl: './season.component.html',
  styleUrls: ['./season.component.scss']
})
export class SeasonComponent implements OnInit {
  
  public season: string = '';
  public tabs = ['Drivers', 'Races'];
  public activeTab = this.tabs[0];
  
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
      this.route.params.subscribe(routeParams => {
        this.season = routeParams['season'];
      })
  }
}
