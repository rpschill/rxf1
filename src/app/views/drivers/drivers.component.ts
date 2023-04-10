import { Component, AfterViewInit, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { DriversService } from 'src/app/services/drivers.service';
import { DriversDataSource } from 'src/app/stores/drivers.datasource';

import { Driver } from '../../models/driver.interface';
import { tap } from 'rxjs';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.scss']
})
export class DriversComponent implements OnInit, AfterViewInit {

  @Input() season: string = '';
  public driver!: Driver;
  public dataSource!: DriversDataSource;
  public columnsToDisplay = ['name', 'number', 'nationality', 'dob', 'url'];
  public pageSize = 10;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private route: ActivatedRoute,
    private driversService: DriversService
  ) {}

  ngOnInit(): void {
    this.dataSource = new DriversDataSource(this.driversService);
    this.route.params.subscribe(routeParams => {
      this.dataSource.loadDrivers(routeParams['season'], this.pageSize, 0);
      this.season = routeParams['season'];
    })
  }

  ngAfterViewInit(): void {
    this.paginator.page
      .pipe(
        tap(() => this.loadDriversPage())
      )
      .subscribe();
  }

  loadDriversPage(): void {
    this.dataSource.loadDrivers(
      this.season,
      this.paginator.pageSize,
      (this.paginator.pageIndex * this.paginator.pageSize)
    )
  }

  updatePageSize(size: number): void {
    this.pageSize = size;
  }
}
