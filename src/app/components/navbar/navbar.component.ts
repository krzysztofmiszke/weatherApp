import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  @Output() weatherType = new EventEmitter<boolean>();

  isWeather: boolean | undefined;
  checked: string = '';

  ngOnInit(): void {
    this.checkIsWeather();
  };

  checkIsWeather() {
    const storedToggleValue: any = localStorage.getItem('isWeather');
    this.isWeather = JSON.parse(storedToggleValue);
    this.isWeather ? this.checked = 'checked' : '';
  }

  changeWeatherType(): void {
    const togglePosition = this.isWeather = !this.isWeather;
    localStorage.setItem('isWeather', JSON.stringify(togglePosition))
    this.weatherType.emit(this.isWeather);
  }

}
