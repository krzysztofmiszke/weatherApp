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

  constructor(
    private dataService: DataService,
    private searchService: SearchService
  ) { }

  ngOnInit() {
    this.getWeather();
    this.getSearchQuery();
  }

  getSearchQuery() {
    this.searchService.getSearchQuery().subscribe(query => {
      this.searchQuery = query;
      this.performSearch();
    })
  }

  getWeather() {
    this.data = this.dataService.getWeather().subscribe(
      (data) => { this.data = data },
      (error) => { }
    )
  }

  performSearch(): void {
    this.data = this.searchService.getWeather(this.searchQuery).subscribe(
      (data) => { this.data = data },
      (error) => { console.log(this.errorMessage = error.error.message) }
    );
  }

}
