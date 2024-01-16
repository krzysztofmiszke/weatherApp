import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeolocationModalComponent } from './geolocation-modal.component';

describe('GeolocationModalComponent', () => {
  let component: GeolocationModalComponent;
  let fixture: ComponentFixture<GeolocationModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeolocationModalComponent]
    });
    fixture = TestBed.createComponent(GeolocationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
