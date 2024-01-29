import { Component, Input } from '@angular/core';

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

  // convertToDate = (date: any) => new Date(date * 1000);

  convertToKilometers = (speed: number) => (speed * 3.6).toFixed(2);
  
}
