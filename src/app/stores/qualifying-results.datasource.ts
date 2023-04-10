import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, catchError, finalize, Observable, of } from 'rxjs';
import { QualifyingResults, QualifyingResultsResponse } from "../models/qualifying-results.interface";
import { QualifyingResultsService } from "../services/qualifying-results.service";

export class QualifyingResultsDataSource implements DataSource<QualifyingResults> {

  private qualifyingSubject = new BehaviorSubject<QualifyingResults[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private lengthSubject = new BehaviorSubject<string>('');

  public loading$ = this.loadingSubject.asObservable();
  public length$ = this.lengthSubject.asObservable();

  constructor(private qualifyingService: QualifyingResultsService) {}

  connect(collectionViewer: CollectionViewer): Observable<QualifyingResults[]> {
    return this.qualifyingSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.qualifyingSubject.complete();
    this.loadingSubject.complete();
    this.lengthSubject.complete();
  }

  loadQualifying(season: string, raceId: string, limit: number, offset: number): void {
    this.loadingSubject.next(true);

    this.qualifyingService.getQualifyingResults(season, raceId, limit, offset).pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
    )
    .subscribe(res => {
      this.qualifyingSubject.next((res as QualifyingResultsResponse).RaceTable.Races[0].QualifyingResults);
      this.lengthSubject.next((res as QualifyingResultsResponse).total);
    });
  }
}