import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  @Output() weatherType = new EventEmitter<boolean>();

  isGeoLocationON: boolean | undefined;
  checked: string = '';

  ngOnInit(): void {
    this.checkIsGeoLocationON();
  };

  checkIsGeoLocationON() {
    const storedToggleValue: any = localStorage.getItem('isGeolocationON'); //string
    this.isGeoLocationON = JSON.parse(storedToggleValue);
    this.isGeoLocationON ? this.checked = 'checked' : '';
    console.log(this.isGeoLocationON)
  }

  onToggleChange() {
    
    // localStorage.setItem('isGeolocationON', JSON.stringify(this.togglePosition))
    // console.log(localStorage.setItem('isGeolocationON', JSON.stringify(this.togglePosition)));
  }

  changeWeatherType(): void {
    this.isGeoLocationON = !this.isGeoLocationON;
    const togglePosition = this.isGeoLocationON;
    localStorage.setItem('isGeolocationON', JSON.stringify(togglePosition))
    console.log(togglePosition, this.isGeoLocationON)
    this.weatherType.emit(this.isGeoLocationON);
  }

}
