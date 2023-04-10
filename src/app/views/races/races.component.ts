import { Component, AfterViewInit, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { RacesService } from 'src/app/services/races.service';
import { RacesDataSource } from 'src/app/stores/races.datasource';
import { Race } from '../../models/race.interface';
import { tap } from 'rxjs';

@Component({
  selector: 'app-races',
  templateUrl: './races.component.html',
  styleUrls: ['./races.component.scss']
})
export class RacesComponent implements OnInit, AfterViewInit {

  @Input() season: string = '';
  public dataSource!: RacesDataSource;
  public columnsToDisplay = ['name', 'round', 'date', 'circuit', 'location', 'more'];
  public pageSize = 10;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private racesService: RacesService
  ) {}

  ngOnInit(): void {
      this.dataSource = new RacesDataSource(this.racesService);
      this.route.params.subscribe(routeParams => {
        this.dataSource.loadRaces(routeParams['season'], this.pageSize, 0);
        this.season = routeParams['season'];
      })
  }

  ngAfterViewInit(): void {
    this.paginator.page
      .pipe(
        tap(() => this.loadRacesPage())
      )
      .subscribe();
  }

  loadRacesPage(): void {
    this.dataSource.loadRaces(
      this.season,
      this.paginator.pageSize,
      (this.paginator.pageIndex * this.paginator.pageSize)
    )
  }

  updatePageSize(size: number): void {
    this.pageSize = size;
  }

  displayRaceDetail(race: Race): void {
    this.router.navigate([`race/${race.round}`], { relativeTo: this.route });
  }
}
