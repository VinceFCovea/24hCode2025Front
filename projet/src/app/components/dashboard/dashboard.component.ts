import { CommonModule } from "@angular/common";
import { AfterViewInit, Component, OnInit } from "@angular/core";
import { VillageoisComponent } from "./villageois/villageois.component";
import { BatimentsComponent } from "./batiments/batiments.component";
import { EquipeRessource } from "../../core/model/equipeRessource";
import { EquipesService } from "../../shared/services/equipes.service";
import { DemandeAction } from "../../core/model/demandeAction";
import { Observable, tap, interval, switchMap } from "rxjs";
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
export class DashboardComponent implements OnInit, AfterViewInit {

  data!: string;
  ressources!: Array<EquipeRessource>;

  equipes: any[] = [];

  couleurs = [
    '#561ED3',
    '#8ABC88',
    '#A08ADF',
    '#1C21D8',
    '#92BC9D',
    '#771ABA',
    '#ED2189',
    '#245B82',
    '#730F74',
    '#0ADB5B',
    '#23E77F',
    '#348579',
    '#9C13E0',
    '#CD6781',
    '#3F24A0',
    '#204509'
  ];

  constructor(
    private readonly equipeService: EquipesService
  ) {}

    ngOnInit(): void {

      this.recupererInfosResources();

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

    ngAfterViewInit(): void {
      // interval(4000).subscribe();
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


}
