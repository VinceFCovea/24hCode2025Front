import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { EquipesService } from "../../../shared/services/equipes.service";
import { EquipeRessource } from "../../../core/model/equipeRessource";
import { INTERVALLE_REFRESH, NOTRE_ID_EQUIPE } from "../../../core/constants/core.constants";
import { interval, tap } from "rxjs";

@Component({
  selector: 'app-ressources',
  imports: [CommonModule],
  templateUrl: './ressources.component.html',
  styleUrl: './ressources.component.css',
  standalone: true
})
export class RessourcesComponent implements OnInit, OnDestroy {

    ressources!: Array<EquipeRessource>;
    precentesRessources!: Array<EquipeRessource>;
    intervalSubscription!: any;

    constructor(
      private readonly equipeService: EquipesService
    ) {}

      ngOnInit(): void {
        this.recupererInfosResources();
        this.lancerIntervalleRefresh();
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
