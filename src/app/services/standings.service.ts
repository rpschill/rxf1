import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { MRData } from '../models/mrdata.interface';
import { API_URL } from '../constants/urls';
import { StandingsResponse } from '../models/standings.interface';

@Injectable({
  providedIn: 'root'
})
export class StandingsService {

  constructor(private http: HttpClient) {}

  getStandings(season: string, raceId: string, limit: number = 10, offset: number = 0): Observable<StandingsResponse> {

    return this.http.get<MRData<StandingsResponse>>(`${API_URL}/${season}/${raceId}/driverStandings.json`, {
      params: new HttpParams()
        .set('offset', offset)
        .set('limit', limit)
    })
      .pipe(
        map(data => data.MRData)
      )
  }
}