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

  convertToKilometers = (speed: number) => (speed * 3.6).toFixed(2);
  
}
