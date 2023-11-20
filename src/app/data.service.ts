import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, mergeMap, tap } from 'rxjs';
import { Weather } from 'src/app/components/weather-card/weather-card.component';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  zabrze: string = '3080985'
  apiKey: string = 'a77716829359c16e80a756f4d9593c06';
  metric: string = '&units=metric';
  count: string = '&cnt=40';
  latitude: string | number = '';
  longitude: string | number = '';
  // apiUrl: string = `http://api.openweathermap.org/data/2.5/forecast?id=${this.zabrze}&appid=`;
  apiUrl: string = `http://api.openweathermap.org/data/2.5/forecast`
  position!: GeolocationPosition;

  constructor(private http: HttpClient) { }

  getWeather(): Observable<Partial<Weather>> {

    const geolocation$ = new Observable<GeolocationPosition>((observer) => {
      navigator.geolocation.getCurrentPosition(
        (position) => observer.next(position),
        (error) => observer.error(error)
      );
    });

    return geolocation$.pipe(
      mergeMap((position: GeolocationPosition) => {

        
        const apiUrlWithGeolocation = `${this.apiUrl}?appid=${this.apiKey}${this.metric}&lat=${position.coords.latitude}&lon=${position.coords.longitude}`;
      
        return this.http.get(apiUrlWithGeolocation).pipe(
          map((response: any) => {
            return response;
          }),
          catchError((error) => {
            console.error('Error fetching weather data:', error);
            throw error;
          })
        );
      }),
      catchError((error) => {
        console.error('Error getting geolocation:', error);
        throw error;
      })
    );

    
  }

}
