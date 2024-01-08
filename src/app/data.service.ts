// import { getLocaleTimeFormat } from '@angular/common';
// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable, catchError, map, mergeMap, tap } from 'rxjs';
// import { Weather } from 'src/app/components/weather-card/weather-card.component';
// @Injectable({
//   providedIn: 'root'
// })
// export class DataService {

//   zabrze: string = '3080985'
//   apiKey: string = 'a77716829359c16e80a756f4d9593c06';
//   metric: string = '&units=metric';
//   count: string = '&cnt=40';
//   latitude: string | number = '';
//   longitude: string | number = '';
//   apiUrlWeather: string = `http://api.openweathermap.org/data/2.5/weather`;
//   apiUrlForecast: string = `http://api.openweathermap.org/data/2.5/forecast`;
//   position!: GeolocationPosition;

//   constructor(
//     private http: HttpClient,
//   ) { }

//   getWeather(): Observable<Partial<Weather>> {
//     const geolocation$ = new Observable<GeolocationPosition>((observer) => {
//       navigator.geolocation.getCurrentPosition(
//         (position) => observer.next(position),
//         (error) => observer.error(error)
//       );
//     });

//     return geolocation$.pipe(
//       mergeMap((position: GeolocationPosition) => {

//         const apiUrlWithGeolocation = `${this.apiUrlWeather}?appid=${this.apiKey}${this.metric}&lat=${position.coords.latitude}&lon=${position.coords.longitude}`;
      
//         return this.http.get(apiUrlWithGeolocation).pipe(
//           map((response: any) => {
//             return response;
//           }),
//           catchError((error) => {
//             console.error('Error fetching weather data:', error);
//             throw error;
//           })
//         );
//       }),
//       catchError((error) => {
//         console.error('Error getting geolocation:', error);
//         throw error;
//       })
//     ); 
//   }

//   getForecast(): Observable<Partial<Weather>> {
//     const geolocation$ = new Observable<GeolocationPosition>((observer) => {
//       navigator.geolocation.getCurrentPosition((position) => observer.next(position),
//       (error) => observer.error(error)
//       );
//     });

//     return geolocation$.pipe(
//       mergeMap((position: GeolocationPosition) => {

//         const apiUrlWithGeolocation = `${this.apiUrlForecast}?appid=${this.apiKey}${this.metric}&lat=${position.coords.latitude}&lon=${position.coords.longitude}`;

//         return this.http.get(apiUrlWithGeolocation).pipe(
//           map((response: any) => {
//             return response;
//           }),
//           catchError((error) => {
//             console.error('Error fetching forecast data:', error);
//             throw error;
//           })
//         );
//       }),
//       catchError((error) => {
//         console.error('Error getting geolocaton:', error);
//         throw error;
//       })
//     )
//   }

// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { Weather } from 'src/app/components/weather-card/weather-card.component';

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
    return throwError('An error occurred. Please try again later.');
  }
}

