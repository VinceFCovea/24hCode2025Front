import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameComponent } from './game/game.component';
import { EquipesService } from './shared/services/equipes.service';
import { NOTRE_ID_EQUIPE } from './core/constants/core.constants';
import { VillageoisService } from './shared/services/villageois.service';
import { DemandeAction } from './core/model/demandeAction';
import { NomAction } from './core/model/nomAction';
import { interval, switchMap } from 'rxjs';
import { EquipeRessource } from './core/model/equipeRessource';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, GameComponent],
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

      // interval(12700).pipe(
      //   switchMap(() => this.villageoisService.demanderActionVillageois(NOTRE_ID_EQUIPE, '17e9cdb2-6bb1-484e-ad06-5f49c47e2034', demandeAction))
      // ).subscribe();
    }

  


}
