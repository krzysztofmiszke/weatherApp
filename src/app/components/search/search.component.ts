import { Component } from '@angular/core';
import { SearchService } from 'src/app/components/search/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  
  searchQuery: string = '';

  constructor(private searchService: SearchService) { }

  onSearch(): void {
    this.searchService.setSearchQuery(this.searchQuery);
    this.searchQuery = '';
  }
  
}
