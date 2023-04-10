import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RacesService } from 'src/app/services/races.service';
import { Race } from '../../models/race.interface';
import { Observable, map } from 'rxjs';
import { ResultsService } from 'src/app/services/results.service';

@Component({
  selector: 'app-race-detail',
  templateUrl: './race-detail.component.html',
  styleUrls: ['./race-detail.component.scss']
})
export class RaceDetailComponent implements OnInit {

  public season = '';
  public race!: Race;
  public raceId: string = '';

  public totalFinished$!: Observable<number>;
  public totalPlusOne$!: Observable<number>;
  public totalAccidents$!: Observable<number>;


  constructor(
    private route: ActivatedRoute,
    private racesService: RacesService,
    private resultsService: ResultsService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(routeParams => {
      this.season = routeParams['season'];
      this.raceId = routeParams['raceId'];
      this.racesService.getRaceDetail(routeParams['season'], routeParams['raceId'])
        .pipe(
          map(data => data.RaceTable.Races[0])
        )
        .subscribe(res => {
          this.race = res;
        });
    });

    this.resultsService.getTotals(this.season, this.raceId)
      .subscribe(() => {
        this.totalFinished$ = this.resultsService.totalFinished$;
        this.totalPlusOne$ = this.resultsService.totalPlusOne$;
        this.totalAccidents$ = this.resultsService.totalAccidents$;
      });

  }

}
