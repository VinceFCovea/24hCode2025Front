import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';

export const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'map', component: MapComponent}
];
