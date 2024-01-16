import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-geolocation-modal',
  templateUrl: './geolocation-modal.component.html',
  styleUrls: ['./geolocation-modal.component.scss']
})
export class GeolocationModalComponent implements OnInit {
  
  @Input() isGeoLocation: boolean = true;
  isModalOpen: boolean | undefined;

  constructor(private dataService: DataService) { }

  ngOnInit(): void { }

  setLocation() {
    this.dataService.getCurrentPosition().subscribe(data => {
      localStorage.setItem('latitude', JSON.stringify(data.coords.latitude));
      localStorage.setItem('longitude', JSON.stringify(data.coords.longitude));
    })
    this.closeGeolocationModal();
  }

  closeGeolocationModal() {
    this.isGeoLocation = true;
  }

}
