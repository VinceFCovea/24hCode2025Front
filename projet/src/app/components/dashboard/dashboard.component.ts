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
  intervalSubscription!: any;

  constructor(
    private readonly equipeService: EquipesService
  ) {}

    ngOnInit(): void {

      this.recupererInfosResources();

      this.lancerIntervalleRefresh();

      // interval(1000).pipe(
      //   tap(_ => {
      //     console.log('plop');
      //     this.recupererInfosResources();
      //   })
      // ).subscribe();

      // interval(1000).pipe(
      //   tap(() => {
      //     console.log('plop');
      //   })).subscribe();

      // interval(1000).pipe(
      //   switchMap(_ => {
      //     return this.recupererInfosResources()
      //   })
      // ).subscribe();

      // interval(this.INTERVALLE_REFRESH).pipe(
      //   tap(i => console.log(i))).subscribe();

      // interval(this.INTERVALLE_REFRESH).pipe(
      //   tap(i => console.log(i)),
      //   switchMap(_ => {
      //     return this.recupererInfosResources();
      //   }),
      //   switchMap(_ => {
      //     return this.recupererInfosEquipes();
      //   })
      // ).subscribe();

      // setInterval(_ => {
      //   this.recupererInfosResources().subscribe();
      //   this.recupererInfosEquipes().subscribe();
      // }, this.INTERVALLE_REFRESH);

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


}
