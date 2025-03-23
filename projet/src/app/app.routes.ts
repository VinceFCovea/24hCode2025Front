import { Routes } from '@angular/router';
import { MapComponent } from './components/map/map.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { VillageoisComponent } from './components/dashboard/villageois/villageois.component';
import { BatimentsComponent } from './components/dashboard/batiments/batiments.component';
import { RessourcesComponent } from './components/dashboard/ressources/ressources.component';
import { EquipesComponent } from './components/dashboard/equipes/equipes.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'map', component: MapComponent},
  { path: 'villageois', component: VillageoisComponent},
  { path: 'batiments', component: BatimentsComponent},
  { path: 'ressources', component: RessourcesComponent},
  { path: 'equipes', component: EquipesComponent},

];
