import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  
  private searchQuerySubject = new Subject<string>();
  
  weatherUrl: string = 'http://api.openweathermap.org/data/2.5/weather?';
  forecastUrl: string = 'http://api.openweathermap.org/data/2.5/forecast?';
  apiKey: string = 'a77716829359c16e80a756f4d9593c06';
  metric: string = '&units=metric';
  count: string = '&cnt=40';
  
  constructor(private http: HttpClient) { }

  setSearchQuery(query: string): void {
    this.searchQuerySubject.next(query);
  }

  getSearchQuery(): Observable<string> {
    return this.searchQuerySubject.asObservable();
  }

  getWeather(searchValue: string): Observable<any> {
    const url = `${this.weatherUrl}q=${searchValue}&appid=${this.apiKey}${this.metric}${this.count}`;
    return this.http.get(url);
  }

  getForecast(searchValue: string): Observable<any> {
    const url = `${this.forecastUrl}q=${searchValue}&appid=${this.apiKey}${this.metric}${this.count}`;
    return this.http.get(url);
  }

}
