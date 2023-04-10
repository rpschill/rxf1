import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { MRData } from '../models/mrdata.interface';
import { API_URL } from '../constants/urls';
import { QualifyingResultsResponse } from '../models/qualifying-results.interface';

@Injectable({
  providedIn: 'root'
})
export class QualifyingResultsService {

  constructor(private http: HttpClient) {}

  getQualifyingResults(season: string, raceId: string, limit: number = 10, offset: number = 0): Observable<QualifyingResultsResponse> {

    return this.http.get<MRData<QualifyingResultsResponse>>(`${API_URL}/${season}/${raceId}/qualifying.json`, {
      params: new HttpParams()
        .set('offset', offset)
        .set('limit', limit)
    })
      .pipe(
        map(data => data.MRData)
      )
  }
}