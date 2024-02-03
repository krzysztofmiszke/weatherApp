import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { SearchService } from 'src/app/components/search/search.service';
import { Forecast, Weather } from 'src/app/models/weather-card/weather-card.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'weatherApp';
  weather: Weather | undefined;
  forecast: Forecast | undefined;
  data: any | undefined;
  searchQuery: string = '';
  errorMessage: string = '';
  isWeather: boolean | undefined;
  weatherNow: any | undefined;

  constructor(
    private dataService: DataService,
    private searchService: SearchService
  ) { }

  ngOnInit() {
    this.getAllData();
    this.getSearchQuery();
  }

  getAllData() {
    this.dataService.getAllData().subscribe({
      next: value => {
        this.weather = value.weather;
        this.forecast = value.forecast;
      },
      error: err => console.error(err.error.message),
      complete: () => console.log('Weather data has been fetched..')
    });
  }

  getSearchQuery() {
    this.searchService.getSearchQuery().subscribe(query => {
      this.searchQuery = query;
      this.performSearch();
    });
  }

  performSearch() {
    this.searchService.getAllData(this.searchQuery).subscribe({
      next: ([weather, forecast]) => {
        this.weather = weather;
        this.forecast = forecast;
      },
      error: err => console.error(err.error.message),
      complete: () => console.log('Search request has been sent..')
    });
  }

}
