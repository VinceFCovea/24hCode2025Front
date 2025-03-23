import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { EquipeRessource } from "../../core/model/equipeRessource";
import { EquipesService } from "../../shared/services/equipes.service";
import { tap, interval } from "rxjs";
import { INTERVALLE_REFRESH, NOTRE_ID_EQUIPE } from "../../core/constants/core.constants";
import { RessourcesComponent } from "./ressources/ressources.component";

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
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
