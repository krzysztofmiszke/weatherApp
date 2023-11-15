import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';
import { Weather } from 'src/app/components/weather-card/weather-card.component';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private searchQuerySubject = new Subject<string>();

  location: string = '';
  apiKey: string = 'a77716829359c16e80a756f4d9593c06';
  apiUrl: string = `http://api.openweathermap.org/data/2.5/forecast?id=${this.location}&appid=`;
  metric: string = '&units=metric';
  count: string = '&cnt=40';

  baseUrl: string = 'http://api.openweathermap.org/data/2.5/forecast?'

  setSearchQuery(query: string): void {
    this.searchQuerySubject.next(query);
  }

  getSearchQuery(): Observable<string> {
    return this.searchQuerySubject.asObservable();
  }

  // getWeather1(location: string): Observable<Partial<Weather>> {
  //   this.location = location;
  //   return this.http.get(`${this.apiUrl}${this.apiKey}${this.metric}${this.count}`).pipe(
  //     map((response: any) => {
  //       return response;
  //     })
  //   )
  // }

  getWeather(searchValue: string): Observable<any> {
    
    const url = `${this.baseUrl}q=${searchValue}&appid=${this.apiKey}${this.metric}${this.count}`
    // return this.http.get(url);
    console.log(url);
    return this.http.get(url);
  }

  constructor(private http: HttpClient) { }
}
