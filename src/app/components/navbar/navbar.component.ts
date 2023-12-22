import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  @Output() weatherType = new EventEmitter<boolean>();

  isWeather: boolean = true;

  ngOnInit(): void {};

  changeWeatherType(): void {
    this.isWeather = !this.isWeather;
    this.weatherType.emit(this.isWeather);
  }

}
