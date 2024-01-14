import { Component, Input } from '@angular/core';

export interface Weather {
  city: City,
  cnt: number,
  cod: string,
  list: [],
  message: number;
}

export interface Forecast {
  base: string,
  clouds: {},
  cod: number,
  coord: {},
  dt: number,
  id: number,
  main: {},
  name: string,
  sys: {},
  timezone: number,
  visibility: number,
  weather: [],
  wind: {}
}

export interface City {
  coord: Coordinates,
  country: string,
  id: number,
  name: string,
  population: number,
  sunrise: number,
  sunset: number,
  timezone: number,
}

export interface Coordinates {
  latitude: number,
  longitude: number
}

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss']
})
export class WeatherCardComponent {

  @Input() item: any | undefined;
  weatherIcon: string = '';
  isWeather: boolean = true;

  constructor() { }

  ngOnInit() { }

  convertToDate = (date: any) => new Date(date * 1000);

  convertToKilometers = (speed: number) => (speed * 3.6).toFixed(2);
  
}
