import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { MRData } from '../models/mrdata.interface';
import { API_URL } from '../constants/urls';
import { RaceResponse } from '../models/race.interface';

@Injectable({
  providedIn: 'root'
})
export class RacesService {

  constructor(private http: HttpClient) {}

  getRaces(season: string, limit: number = 10, offset: number = 0): Observable<RaceResponse> {

    return this.http.get<MRData<RaceResponse>>(`${API_URL}/${season}.json`, {
      params: new HttpParams()
        .set('offset', offset)
        .set('limit', limit)
    })
      .pipe(
        map(data => data.MRData),
      )
  }

  getRaceDetail(season: string, raceId: string): Observable<RaceResponse> {

    return this.http.get<MRData<RaceResponse>>(`${API_URL}/${season}/${raceId}.json`)
      .pipe(
        map(data => data.MRData)
      )
  }
}