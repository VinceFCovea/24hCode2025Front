import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { EquipesService } from "../../../shared/services/equipes.service";
import { tap } from "rxjs";

@Component({
  selector: 'app-equipes',
  imports: [CommonModule],
  templateUrl: './equipes.component.html',
  styleUrl: './equipes.component.css',
  standalone: true
})
export class EquipesComponent implements OnInit {

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

  constructor(private readonly equipeService: EquipesService) {}

  ngOnInit(): void {
    this.recupererInfosEquipes().subscribe();
  }


  recupererInfosEquipes() {
        return this.equipeService.recupererEquipes().pipe(
          tap(equipes => {
            this.equipes = equipes.map((equipe, index) => {return {id: equipe.idEquipe, nom: `${equipe.nom} [${equipe.type}]`, score: equipe?.ressources?.find(res => res.ressource.nom === 'POINT')?.quantite}});
            this.equipes.sort((a, b) => b.score - a.score);
          })
        );
  }

}
