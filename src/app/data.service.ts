import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import * as weatherModel from 'src/app/models/weather-card/weather-card.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private readonly apiKey: string = 'a77716829359c16e80a756f4d9593c06';
  private readonly metric: string = '&units=metric';
  private readonly apiUrlWeather: string = 'http://api.openweathermap.org/data/2.5/weather';
  private readonly apiUrlForecast: string = 'http://api.openweathermap.org/data/2.5/forecast';

  constructor(private http: HttpClient) {}

  getAllData(): Observable<{ weather: weatherModel.Weather, forecast: weatherModel.Forecast }> {
    return this.getCurrentPosition().pipe(
      mergeMap((position: GeolocationPosition) => {
        const apiUrlWeatherWithGeolocation = `${this.apiUrlWeather}?appid=${this.apiKey}${this.metric}&lat=${position.coords.latitude}&lon=${position.coords.longitude}`;
        const apiUrlForecastWithGeolocation = `${this.apiUrlForecast}?appid=${this.apiKey}${this.metric}&lat=${position.coords.latitude}&lon=${position.coords.latitude}`;
        return forkJoin([
          this.http.get(apiUrlWeatherWithGeolocation),
          this.http.get(apiUrlForecastWithGeolocation)
        ]).pipe(
          map(([weatherResponse, forecastResponse]) => {
            return {
              weather: this.mapResponseForWeather(weatherResponse),
              forecast: this.mapResponseForForecast(forecastResponse)
            };
          }),
          catchError(([weatherError, forecastError]) => this.handleError(
            ['Error fetching weather data: ', weatherError],
            ['Error fetching forecast data: ', forecastError]
          ))
        )
      })
    );
  }

  private mapResponseForWeather(response: any): weatherModel.Weather {
    return {
      base: response.base,
      clouds: response.clouds,
      cod: response.cod,
      coord: response.coord,
      dt: response.dt,
      id: response.id,
      main: response.main,
      name: response.name,
      sys: response.sys,
      timezone: response.timezone,
      visibility: response.visibility,
      weather: response.weather,
      wind: response.wind
    } as weatherModel.Weather
  }

  private mapResponseForForecast(response: any): weatherModel.Forecast {
    return {
      city: response.city,
      cnt: response.cnt, 
      cod: response.cod,
      list: response.list,
      message: response.message
    } as weatherModel.Forecast
  }

  private getCurrentPosition(): Observable<GeolocationPosition> {
    return new Observable<GeolocationPosition>((observer) => {
      navigator.geolocation.getCurrentPosition(
        (position) => observer.next(position),
        (error) => observer.error(error)
      );
    });
  }

  private handleError(message: string[], error: any): Observable<never> {
    console.error(message, error);
    return error('An error occurred. Please try again later.');
  }
}
