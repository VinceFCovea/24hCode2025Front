import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { VillageoisComponent } from "./villageois/villageois.component";
import { BatimentsComponent } from "./batiments/batiments.component";
import { EquipeRessource } from "../../core/model/equipeRessource";
import { EquipesService } from "../../shared/services/equipes.service";
import { tap, interval } from "rxjs";
import { INTERVALLE_REFRESH, NOTRE_ID_EQUIPE } from "../../core/constants/core.constants";
import { EquipesComponent } from "./equipes/equipes.component";
import { RessourcesComponent } from "./ressources/ressources.component";

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, VillageoisComponent, BatimentsComponent, EquipesComponent, RessourcesComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  standalone: true
})
export class DashboardComponent implements OnInit {

  data!: string;
  ressources!: Array<EquipeRessource>;
  precentesRessources!: Array<EquipeRessource>;
  intervalSubscription!: any;

  constructor(
    private readonly equipeService: EquipesService
  ) {}

    ngOnInit(): void {
      this.recupererInfosResources();
    }


    recupererInfosResources() {
      return this.equipeService.recupererEquipe(NOTRE_ID_EQUIPE).pipe(
        tap(
        (equipe) => {
          this.data = equipe.nom;
        }
      )).subscribe();
    }

}
