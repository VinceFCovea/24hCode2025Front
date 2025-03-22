import { Component } from '@angular/core';
import { VillageoisService } from '../../../shared/services/villageois.service';
import { villageois } from '../../../mocks/villagers';
import { NOTRE_ID_EQUIPE } from '../../../core/constants/core.constants';
import { log } from 'console';
import { Villageois } from '../../../core/model/villageois';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-villageois',
  imports: [CommonModule],
  templateUrl: './villageois.component.html',
  styleUrl: './villageois.component.css'
})
export class VillageoisComponent {

  nom!: string[];
  listeVillageois?: Villageois[]

  constructor(
    private readonly villageoisService : VillageoisService
  ) {}

  ngOnInit() : void {
    this.getListeVillageaois();
  }

  getListeVillageaois() {
    this.villageoisService.recupererListeVillageoisEquipe(NOTRE_ID_EQUIPE).subscribe({
      next: (data) => {
        this.listeVillageois = data.map((villageois) => villageois);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des villageois:', err);
      }
    });
  }

}
