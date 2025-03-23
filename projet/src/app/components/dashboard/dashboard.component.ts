import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { VillageoisComponent } from "./villageois/villageois.component";
import { BatimentsComponent } from "./batiments/batiments.component";
import { EquipeRessource } from "../../core/model/equipeRessource";
import { EquipesService } from "../../shared/services/equipes.service";
import { DemandeAction } from "../../core/model/demandeAction";
import { tap, interval } from "rxjs";
import { INTERVALLE_REFRESH, NOTRE_ID_EQUIPE } from "../../core/constants/core.constants";
import { NomAction } from "../../core/model/nomAction";
import { EquipesComponent } from "./equipes/equipes.component";

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, VillageoisComponent, BatimentsComponent, EquipesComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  standalone: true
})
export class DashboardComponent implements OnInit, OnDestroy {

  data!: string;
  ressources!: Array<EquipeRessource>;
  precentesRessources!: Array<EquipeRessource>;
  intervalSubscription!: any;

  constructor(
    private readonly equipeService: EquipesService
  ) {}

    ngOnInit(): void {

      this.recupererInfosResources();

      this.lancerIntervalleRefresh();

      const demandeAction: DemandeAction = {
        action: NomAction.RECOLTER,
        reference: 'CHARBON'
      };

    }

    lancerIntervalleRefresh() {
      this.intervalSubscription = interval(INTERVALLE_REFRESH).subscribe(() => {
        this.recupererInfosResources();
      });
    }

    recupererInfosResources() {
      return this.equipeService.recupererEquipe(NOTRE_ID_EQUIPE).pipe(
        tap(
        (equipe) => {
          this.data = equipe.nom;
          this.precentesRessources = this.ressources;
          this.ressources = equipe.ressources!;
          this.ressources.sort((a, b) => {
            if (a.ressource.nom < b.ressource.nom) {
              return -1;
            } else {
              return 1;
            }
          });
        }
      )).subscribe();
    }

    ngOnDestroy(): void {
      this.intervalSubscription?.unsubscribe();
    }


    calculerDelta(nomRessource: string, nouvelleQuantite: number) {
      if (this.precentesRessources) {
        const ancienneQuantite = this.precentesRessources.find(res => res.ressource.nom === nomRessource)!.quantite;
        return nouvelleQuantite - ancienneQuantite;
      } else {
        return 0;
      }
    }

}
