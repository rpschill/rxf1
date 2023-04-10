import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, catchError, finalize, Observable, of } from 'rxjs';
import { Race, RaceResponse } from '../models/race.interface';
import { RacesService } from '../services/races.service';

export class RacesDataSource implements DataSource<Race> {

  private racesSubject = new BehaviorSubject<Race[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private lengthSubject = new BehaviorSubject<string>('');

  public loading$ = this.loadingSubject.asObservable();
  public length$ = this.lengthSubject.asObservable();

  constructor(private racesService: RacesService) {}

  connect(collectionViewer: CollectionViewer): Observable<Race[]> {
    return this.racesSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.racesSubject.complete();
    this.lengthSubject.complete();
    this.loadingSubject.complete();
  }

  loadRaces(season: string, limit: number, offset: number): void {
    this.loadingSubject.next(true);

    this.racesService.getRaces(season, limit, offset).pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
    )
    .subscribe(res => {
      this.racesSubject.next((res as RaceResponse).RaceTable.Races);
      this.lengthSubject.next((res as RaceResponse).total);
    });
  }
}