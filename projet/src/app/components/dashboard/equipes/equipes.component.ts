import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { EquipesService } from "../../../shared/services/equipes.service";
import { interval, tap } from "rxjs";
import { INTERVALLE_REFRESH } from "../../../core/constants/core.constants";

@Component({
  selector: 'app-equipes',
  imports: [CommonModule],
  templateUrl: './equipes.component.html',
  styleUrl: './equipes.component.css',
  standalone: true
})
export class EquipesComponent implements OnInit, OnDestroy {

  equipes: any[] = [];
  intervalSubscription!: any;

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

  constructor(private readonly equipeService: EquipesService) {}

  ngOnInit(): void {
    this.recupererInfosEquipes();
    this.lancerIntervalleRefresh();
  }

  lancerIntervalleRefresh() {
      this.intervalSubscription = interval(INTERVALLE_REFRESH).subscribe(() => {
        this.recupererInfosEquipes();
      });
    }


  recupererInfosEquipes() {
        return this.equipeService.recupererEquipes().pipe(
          tap(equipes => {
            this.equipes = equipes.map((equipe, index) => {return {id: equipe.idEquipe, nom: `${equipe.nom} [${equipe.type}]`, score: equipe?.ressources?.find(res => res.ressource.nom === 'POINT')?.quantite}});
            this.equipes.sort((a, b) => b.score - a.score);
          })
        );
  }

  ngOnDestroy(): void {
    this.intervalSubscription?.unsubscribe();
  }

}
