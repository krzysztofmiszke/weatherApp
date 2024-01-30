import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { SearchService } from 'src/app/components/search/search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'weatherApp';
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
    this.isWeather ? this.getWeather() : this.getForecast();
    this.getSearchQuery();
  }

  checkWeather(isWeather: boolean): void {
    this.isWeather = isWeather;
    isWeather ? this.getWeather() : this.getForecast();
  }

  getSearchQuery() {
    this.searchService.getSearchQuery().subscribe(query => {
      this.searchQuery = query;
      this.performSearch();
    })
  }

  getWeather() {
    this.dataService.getWeather().subscribe({
      next: value => this.data = value,
      error: err => console.error(err.error.message),
      complete: () => console.log('GetWeather subscription has been completed')
    });
  }

  getForecast() {
    this.dataService.getForecast().subscribe({
      next: value => this.data = value,
      error: err => console.error(err.error.message),
      complete: () => console.log('GetForecast subscription has been completed')
    });
  }

  performSearch(): void {
    this.isWeather 
    ? this.searchService.getWeather(this.searchQuery).subscribe({
      next: value => this.data = value,
      error: err => console.error(err.error.message),
      complete: () => console.log('Search subscription has been completed')
    })
    : this.searchService.getForecast(this.searchQuery).subscribe({
      next: value => this.data = value,
      error: err => console.error(err.error.message),
      complete: () => console.log('Search subscription has been completed')
    });
  }

}
