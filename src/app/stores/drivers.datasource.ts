import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, catchError, finalize, Observable, of } from 'rxjs';
import { Driver, DriverResponse } from '../models/driver.interface';
import { DriversService } from "../services/drivers.service";

export class DriversDataSource implements DataSource<Driver> {

  private driversSubject = new BehaviorSubject<Driver[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private lengthSubject = new BehaviorSubject<string>('');

  public loading$ = this.loadingSubject.asObservable();
  public length$ = this.lengthSubject.asObservable();

  constructor(private driversService: DriversService) {}

  connect(collectionViewer: CollectionViewer): Observable<Driver[]> {
    return this.driversSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.driversSubject.complete();
    this.lengthSubject.complete();
    this.loadingSubject.complete();
  }

  loadDrivers(season: string, limit: number, offset: number): void {
    this.loadingSubject.next(true);

    this.driversService.getDrivers(season, limit, offset).pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
    )
    .subscribe(res => {
      this.driversSubject.next((res as DriverResponse).DriverTable.Drivers);
      this.lengthSubject.next((res as DriverResponse).total);
    });
  }
}
