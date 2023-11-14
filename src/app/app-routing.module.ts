import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherCardComponent } from 'src/app/components/weather-card/weather-card.component';

const routes: Routes = [
  {
    path: 'weather-card',
    component: WeatherCardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
