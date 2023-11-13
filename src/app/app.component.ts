import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';

export interface Weather {
  city: City,
  cnt: number,
  cod: string,
  list: [],
  message: number;
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
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'weatherApp';
  data: any | undefined;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.data = this.dataService.getWeather().subscribe(
      (data) => {
        this.data = data;
        console.log(data)
      },
      (error) => {
        console.error(error, "error xd")
      }
    )
  }

  


}
