import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { Weather } from 'src/app/models/weather-card/weather-card.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private readonly apiKey: string = 'a77716829359c16e80a756f4d9593c06';
  private readonly metric: string = '&units=metric';
  private readonly apiUrlWeather: string = 'http://api.openweathermap.org/data/2.5/weather';
  private readonly apiUrlForecast: string = 'http://api.openweathermap.org/data/2.5/forecast';

  constructor(private http: HttpClient) {}

  getWeather(): Observable<Partial<Weather>> {
    return this.getCurrentPosition().pipe(
      mergeMap((position: GeolocationPosition) => {
        const apiUrlWithGeolocation = `${this.apiUrlWeather}?appid=${this.apiKey}${this.metric}&lat=${position.coords.latitude}&lon=${position.coords.longitude}`;
        return this.http.get(apiUrlWithGeolocation).pipe(
          map((response: any) => response),
          catchError((error) => this.handleError('Error fetching weather data:', error))
        );
      }),
      catchError((error) => this.handleError('Error getting geolocation:', error))
    );
  }

  getForecast(): Observable<Partial<Weather>> {
    return this.getCurrentPosition().pipe(
      mergeMap((position: GeolocationPosition) => {
        const apiUrlWithGeolocation = `${this.apiUrlForecast}?appid=${this.apiKey}${this.metric}&lat=${position.coords.latitude}&lon=${position.coords.longitude}`;
        return this.http.get(apiUrlWithGeolocation).pipe(
          map((response: any) => response),
          catchError((error) => this.handleError('Error fetching forecast data:', error))
        );
      }),
      catchError((error) => this.handleError('Error getting geolocation:', error))
    );
  }

  private getCurrentPosition(): Observable<GeolocationPosition> {
    return new Observable<GeolocationPosition>((observer) => {
      navigator.geolocation.getCurrentPosition(
        (position) => observer.next(position),
        (error) => observer.error(error)
      );
    });
  }

  private handleError(message: string, error: any): Observable<never> {
    console.error(message, error);
    return error('An error occurred. Please try again later.');
  }
}
