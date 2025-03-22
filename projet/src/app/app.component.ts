import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameComponent } from './game/game.component';
import { EquipesService } from './shared/services/equipes.service';
import { NOTRE_ID_EQUIPE } from './core/constants/core.constants';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GameComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'projet';
  data!: string;

  constructor(private readonly equipeService: EquipesService) {
    this.equipeService.recupererEquipe(NOTRE_ID_EQUIPE).subscribe(
      (equipe) => {
        this.data = equipe.nom;
      }
    );
  }

}
