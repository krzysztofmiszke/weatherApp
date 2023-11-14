import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-weather-icon',
  templateUrl: './weather-icon.component.html',
  styleUrls: ['./weather-icon.component.scss']
})
export class WeatherIconComponent {

  @Input() weather: string = '';
  @Input() weatherIcon: string = '';
  weatherUrl: string | undefined;

  ngOnInit(): void {
    this.weatherIcon ? this.weatherUrl = `https://openweathermap.org/img/wn/${this.weatherIcon}@2x.png` : '';
  }
}
