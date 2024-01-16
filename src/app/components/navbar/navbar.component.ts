import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  @Output() weatherType = new EventEmitter<boolean>();

  isGeoLocationON: boolean = false;

  ngOnInit(): void {};

  changeWeatherType(): void {
    this.isGeoLocationON = !this.isGeoLocationON;
    this.weatherType.emit(this.isGeoLocationON);
  }

}
