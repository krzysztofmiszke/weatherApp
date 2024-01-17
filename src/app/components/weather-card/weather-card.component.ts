import { Component, Input } from '@angular/core';

export interface Weather {
  base: string,
  clouds: Clouds,
  cod: number,
  coord: Coordinates,
  dt: number,
  id: number,
  main: Main,
  name: string,
  sys: Sys,
  timezone: number,
  visibility: number,
  weather: [SubWeather],
  wind: Wind
}

export interface Clouds {
  all: number
}

export interface Main {
  feels_like: number,
  humidity: number,
  pressure: number,
  temp: number,
  temp_max: number,
  temp_min: number
}

export interface Sys {
  country: string,
  id: number,
  sunrise: number,
  sunset: number,
  type: number
}

export interface SubWeather {
  description: string,
  icon: string,
  id: number,
  main: string
}

export interface Wind {
  deg: number,
  gust: number,
  speed: number
}

export interface Forecast {
  city: City,
  cnt: number,
  cod: string,
  list: [],
  message: number
}

export interface City {
  coord: Coordinates,
  country: string,
  id: number,
  name: string,
  population: number,
  sunrise: number,
  sunset: number,
  timezone: number
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
