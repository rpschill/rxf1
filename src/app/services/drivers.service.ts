import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { DriverResponse } from '../models/driver.interface';
import { MRData } from '../models/mrdata.interface';
import { API_URL } from '../constants/urls';

@Injectable({
  providedIn: 'root'
})
export class DriversService {

  constructor(private http: HttpClient) {}

  getDrivers(season: string, limit: number = 10, offset: number = 0): Observable<DriverResponse> {

    return this.http.get<MRData<DriverResponse>>(`${API_URL}/${season}/drivers.json`, {
      params: new HttpParams()
        .set('offset', offset)
        .set('limit', limit)
    })
      .pipe(
        map(data => data.MRData)
      )
  }
}
