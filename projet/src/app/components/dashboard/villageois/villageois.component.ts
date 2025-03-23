import { Component, OnDestroy, OnInit } from '@angular/core';
import { VillageoisService } from '../../../shared/services/villageois.service';
import { INTERVALLE_REFRESH, NOTRE_ID_EQUIPE } from '../../../core/constants/core.constants';
import { Villageois } from '../../../core/model/villageois';
import { CommonModule } from '@angular/common';
import { interval } from 'rxjs';

@Component({
  selector: 'app-villageois',
  imports: [CommonModule],
  templateUrl: './villageois.component.html',
  styleUrl: './villageois.component.css'
})
export class VillageoisComponent implements OnInit, OnDestroy {

  nom!: string[];
  listeVillageois?: Villageois[];
  intervalSubscription!: any;

  constructor(
    private readonly villageoisService : VillageoisService
  ) {}

  ngOnInit() : void {
    this.getListeVillageois();
    this.lancerIntervalleRefresh();
  }

  getListeVillageois() {
    this.villageoisService.recupererListeVillageoisEquipe(NOTRE_ID_EQUIPE).subscribe({
      next: (data) => {
        this.listeVillageois = data.map((villageois) => villageois);
        this.listeVillageois.sort((a, b) => {
          if (a.idVillageois < b.idVillageois) {
            return -1;
          } else {
            return 1;
          }
        });
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des villageois:', err);
      }
    });
  }

  lancerIntervalleRefresh() {
    this.intervalSubscription = interval(INTERVALLE_REFRESH).subscribe(() => {
      this.getListeVillageois();
    });
  }


  ngOnDestroy(): void {
    this.intervalSubscription?.unsubscribe();
  }


}
