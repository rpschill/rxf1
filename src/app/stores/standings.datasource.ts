import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, catchError, finalize, Observable, of } from 'rxjs';
import { DriverStanding, StandingsResponse } from "../models/standings.interface";
import { StandingsService } from "../services/standings.service";

export class StandingsDataSource implements DataSource<DriverStanding> {

  private standingsSubject = new BehaviorSubject<DriverStanding[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private lengthSubject = new BehaviorSubject<string>('');

  public loading$ = this.loadingSubject.asObservable();
  public length$ = this.lengthSubject.asObservable();

  constructor(private standingsService: StandingsService) {}

  connect(collectionView: CollectionViewer): Observable<DriverStanding[]> {
    return this.standingsSubject.asObservable();
  }

  disconnect(collectionView: CollectionViewer): void {
    this.standingsSubject.complete();
    this.loadingSubject.complete();
    this.lengthSubject.complete();
  }

  loadStandings(season: string, raceId: string, limit: number, offset: number): void {
    this.loadingSubject.next(true);

    this.standingsService.getStandings(season, raceId, limit, offset).pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
    )
    .subscribe(res => {
      this.standingsSubject.next((res as StandingsResponse).StandingsTable.StandingsLists[0].DriverStandings);
      this.lengthSubject.next((res as StandingsResponse).total);
    });
  }
}