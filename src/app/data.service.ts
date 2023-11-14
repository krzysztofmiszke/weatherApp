import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Weather } from 'src/app/app.component';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  zabrze: string = '3080985'
  apiKey: string = 'a77716829359c16e80a756f4d9593c06';
  apiUrl: string = `http://api.openweathermap.org/data/2.5/forecast?id=${this.zabrze}&appid=`;
  metric: string = '&units=metric';
  count: string = '&cnt=80';

  constructor(private http: HttpClient) { }

  getWeather(): Observable<Partial<Weather>> {
    return this.http.get(`${this.apiUrl}${this.apiKey}${this.metric}`).pipe(
      map((response: any) => {
        return response;
      })
    )
  }
}
