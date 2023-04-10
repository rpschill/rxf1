import { Component, Input, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { ResultsService } from 'src/app/services/results.service';
import { ResultsDataSource } from 'src/app/stores/results.datasource';

@Component({
  selector: 'app-final-results',
  templateUrl: './final-results.component.html',
  styleUrls: ['./final-results.component.scss']
})
export class FinalResultsComponent implements OnInit, AfterViewInit {

  @Input() season = '';
  @Input() raceId = '';

  public pageSize = 10;
  public dataSource!: ResultsDataSource;
  public columnsToDisplay = ['position', 'driver', 'number', 'time'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private route: ActivatedRoute,
    private resultsService: ResultsService
  ) {}

  ngOnInit(): void {
    this.dataSource = new ResultsDataSource(this.resultsService);
    this.route.params.subscribe(routeParams => {
      this.dataSource.loadResults(routeParams['season'], routeParams['raceId'], this.pageSize, 0);
      this.season = routeParams['season'];
      this.raceId = routeParams['raceId'];
    })
  }

  ngAfterViewInit(): void {
    this.paginator.page
      .pipe(
        tap((page) => this.loadResultsPage(page))
      )
      .subscribe();
  }

  loadResultsPage(page: PageEvent): void {
    this.dataSource.loadResults(
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
