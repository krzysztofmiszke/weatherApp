import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, forkJoin, map } from 'rxjs';
import { apiKey } from 'src/environments/api-key';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  
  private searchQuerySubject = new Subject<string>();
  
  weatherUrl: string = 'http://api.openweathermap.org/data/2.5/weather?';
  forecastUrl: string = 'http://api.openweathermap.org/data/2.5/forecast?';
  apiKey: string = apiKey;
  metric: string = '&units=metric';
  count: string = '&cnt=40';
  
  constructor(private http: HttpClient) { }

  setSearchQuery(query: string): void {
    this.searchQuerySubject.next(query);
  }

  getSearchQuery(): Observable<string> {
    return this.searchQuerySubject.asObservable();
  }

  getAllData(searchValue: string): Observable<any> {
    const weatherUrl = `${this.weatherUrl}q=${searchValue}&appid=${this.apiKey}${this.metric}${this.count}`;
    const forecastUrl = `${this.forecastUrl}q=${searchValue}&appid=${this.apiKey}${this.metric}${this.count}`;
    return forkJoin([
      this.http.get(weatherUrl),
      this.http.get(forecastUrl)
    ]);
  }

}
