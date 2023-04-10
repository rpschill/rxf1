import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, catchError, finalize, Observable, of } from 'rxjs';
import { FinalResults, ResultsResponse } from "../models/results.interface";
import { ResultsService } from "../services/results.service";

export class ResultsDataSource implements DataSource<FinalResults> {

  private resultsSubject = new BehaviorSubject<FinalResults[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private lengthSubject = new BehaviorSubject<string>('');

  public loading$ = this.loadingSubject.asObservable();
  public length$ = this.lengthSubject.asObservable();

  constructor(private resultsService: ResultsService) {}

  connect(collectionViewer: CollectionViewer): Observable<FinalResults[]> {
    return this.resultsSubject.asObservable();
  }

  disconnect(collectionView: CollectionViewer): void {
    this.resultsSubject.complete();
    this.loadingSubject.complete();
    this.lengthSubject.complete();
  }

  loadResults(season: string, raceId: string, limit: number, offset: number): void {
    this.loadingSubject.next(true);

    this.resultsService.getResults(season, raceId, limit, offset).pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
    )
    .subscribe(res => {
      this.resultsSubject.next((res as ResultsResponse).RaceTable.Races[0].Results);
      this.lengthSubject.next((res as ResultsResponse).total);
    });
  }
}