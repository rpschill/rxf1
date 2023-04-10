import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { MRData } from '../models/mrdata.interface';
import { API_URL } from '../constants/urls';
import { ResultsResponse } from '../models/results.interface';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  private finishedSubject = new BehaviorSubject<number>(0);
  private plusOneSubject = new BehaviorSubject<number>(0);
  private accidentsSubject = new BehaviorSubject<number>(0);

  public totalFinished$ = this.finishedSubject.asObservable();
  public totalPlusOne$ = this.plusOneSubject.asObservable();
  public totalAccidents$ = this.accidentsSubject.asObservable();

  constructor(private http: HttpClient) {}

  getResults(season: string, raceId: string, limit: number = 10, offset: number = 0): Observable<ResultsResponse> {

    return this.http.get<MRData<ResultsResponse>>(`${API_URL}/${season}/${raceId}/results.json`, {
      params: new HttpParams()
        .set('offset', offset)
        .set('limit', limit)
    })
      .pipe(
        map(data => data.MRData)
      )
  }

  getTotals(season: string, raceId: string): Observable<ResultsResponse> {

    return this.http.get<MRData<ResultsResponse>>(`${API_URL}/${season}/${raceId}/results.json`).pipe(
      map(data => data.MRData),
      tap(data => {
        this.getTotalFinished(data);
        this.getTotalPlusOne(data);
        this.getTotalAccidents(data);
      })
    )
  }

  private getTotalFinished(results: ResultsResponse): void {
    let count = 0;

    results.RaceTable.Races[0].Results.forEach(result => {
      if (result.status === 'Finished') {
        count++;
      }
    });

    this.finishedSubject.next(count);
  }

  private getTotalPlusOne(results: ResultsResponse): void {
    let count = 0;

    results.RaceTable.Races[0].Results.forEach(result => {
      if (result.status === '+1 Lap') {
        console.log('plus one');
        count++;
      }
    });

    this.plusOneSubject.next(count);
  }

  private getTotalAccidents(results: ResultsResponse): void {
    let count = 0;

    results.RaceTable.Races[0].Results.forEach(result => {
      if (result.status !== 'Finished' && result.status !== '+1 Lap') {
        count++;
      }
    });

    this.accidentsSubject.next(count);
  }
}