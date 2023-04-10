import { Component, Input, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { StandingsService } from 'src/app/services/standings.service';
import { StandingsDataSource } from 'src/app/stores/standings.datasource';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.scss']
})
export class StandingsComponent implements OnInit, AfterViewInit {

  @Input() season = '';
  @Input() raceId = '';

  public pageSize = 10;
  public dataSource!: StandingsDataSource;
  public columnsToDisplay = ['position', 'driver', 'wins', 'points'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private route: ActivatedRoute,
    private standingsService: StandingsService
  ) {}

  ngOnInit(): void {
    this.dataSource = new StandingsDataSource(this.standingsService);
    this.route.params.subscribe(routeParams => {
      this.dataSource.loadStandings(routeParams['season'], routeParams['raceId'], this.pageSize, 0);
      this.season = routeParams['season'];
      this.raceId = routeParams['raceId'];
    });
  }

  ngAfterViewInit(): void {
    this.paginator.page
      .pipe(
        tap(() => this.loadStandingsPage())
      )
      .subscribe();
  }

  loadStandingsPage(): void {
    this.dataSource.loadStandings(
      this.season,
      this.raceId,
      this.paginator.pageSize,
      (this.paginator.pageIndex * this.paginator.pageSize)
    )
  }

  updatePageSize(size: number): void {
    this.pageSize = size;
  }
}
