import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EquipesService } from './shared/services/equipes.service';
import { NOTRE_ID_EQUIPE } from './core/constants/core.constants';
import { VillageoisService } from './shared/services/villageois.service';
import { DemandeAction } from './core/model/demandeAction';
import { NomAction } from './core/model/nomAction';
import { interval, switchMap } from 'rxjs';
import { EquipeRessource } from './core/model/equipeRessource';
import { CommonModule } from '@angular/common';
import { Application, Assets, Sprite } from 'pixi.js';
import { loadTextures } from 'pixi.js';
import { VillageoisComponent } from './villageois/villageois.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule, VillageoisComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'projet';
  data!: string;
  ressources!: Array<EquipeRessource>;;


  constructor(
    private readonly equipeService: EquipesService,
    private readonly villageoisService: VillageoisService
  ) {}

    ngOnInit(): void {
      this.equipeService.recupererEquipe(NOTRE_ID_EQUIPE).subscribe(
        (equipe) => {
          this.data = equipe.nom;
          this.ressources = equipe.ressources!;
        }
      );

      const demandeAction: DemandeAction = {
        action: NomAction.RECOLTER,
        reference: 'CHARBON'
      };

      

    }

}
