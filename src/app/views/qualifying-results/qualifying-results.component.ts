import { Component, Input, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { QualifyingResultsService } from 'src/app/services/qualifying-results.service';
import { QualifyingResultsDataSource } from 'src/app/stores/qualifying-results.datasource';

@Component({
  selector: 'app-qualifying-results',
  templateUrl: './qualifying-results.component.html',
  styleUrls: ['./qualifying-results.component.scss']
})
export class QualifyingResultsComponent implements OnInit, AfterViewInit {

  @Input() season = '';
  @Input() raceId = '';

  public pageSize = 10;
  public dataSource!: QualifyingResultsDataSource;
  public columnsToDisplay = ['position', 'driver', 'number', 'Q1', 'Q2', 'Q3'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private route: ActivatedRoute,
    private qualifyingService: QualifyingResultsService
  ) {}

  ngOnInit(): void {
    this.dataSource = new QualifyingResultsDataSource(this.qualifyingService);
    this.route.params.subscribe(routeParams => {
      this.dataSource.loadQualifying(routeParams['season'], routeParams['raceId'], this.pageSize, 0);
      this.season = routeParams['season'];
      this.raceId = routeParams['raceId'];
    })
  }

  ngAfterViewInit(): void {
    this.paginator.page
      .pipe(
        tap(() => this.loadQualifyingPage())
      )
      .subscribe();
  }

  loadQualifyingPage(): void {
    this.dataSource.loadQualifying(
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
