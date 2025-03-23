import { Routes } from '@angular/router';
import { MapComponent } from './components/map/map.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { VillageoisComponent } from './components/dashboard/villageois/villageois.component';
import { BatimentsComponent } from './components/dashboard/batiments/batiments.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'map', component: MapComponent},
  { path: 'villageois', component: VillageoisComponent},
  { path: 'batiments', component: BatimentsComponent}
];
