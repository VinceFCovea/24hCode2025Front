import { Component, OnDestroy, OnInit } from '@angular/core';
import { MondeService } from '../../../shared/services/monde.service';
import { CaseBatiment } from '../../../core/model/caseBatiment';
import { InfoMap } from '../../../core/model/infoMap';
import { INTERVALLE_REFRESH, NOTRE_ID_EQUIPE } from '../../../core/constants/core.constants';
import { CommonModule } from '@angular/common';
import { ProgressionPipe } from '../../../core/pipes/progression.pipe';
import { Batiment } from '../../../core/model/batiment';
import { BatimentRessource } from '../../../core/model/batimentRessource';
import { interval } from 'rxjs';
import {
  MatProgressBarModule
} from '@angular/material/progress-bar';
import { BatimentsService } from '../../../shared/services/batiments.service';

@Component({
  selector: 'app-batiments',
  imports: [CommonModule, ProgressionPipe, MatProgressBarModule],
  templateUrl: './batiments.component.html',
  styleUrl: './batiments.component.css'
})
export class BatimentsComponent implements OnInit, OnDestroy {

  infoMap : InfoMap[] = [];
  listeBatiments?: Batiment[] = [];
  monEquipeId = NOTRE_ID_EQUIPE;
  couts?:BatimentRessource[]
  intervalSubscription!: any;

  constructor(
    private mondeService: MondeService,
    private batimentService : BatimentsService,
  ) {}

  ngOnInit() {
      this.recupererInfosBatiments();
      this.lancerIntervalleRefresh();
  }

  recupererInfosBatiments() {
    this.infoMap = [];
    for (let i = 0; i < 33; i++) {
      this.mondeService.recupererInfosMap(0, 32, i, i).subscribe(infosMap => {
        const batiments = infosMap.filter(infoMap =>
          infoMap.batiment_construit && infoMap.batiment_construit.proprietaire.idEquipe === this.monEquipeId
        );
        this.infoMap = this.infoMap ? [...this.infoMap, ...batiments] : batiments;
        this.infoMap.sort((a, b) => {
          return (a.coord_x - b.coord_x) + (a.coord_y - b.coord_y);
        });
      });
    }
  }

  lancerIntervalleRefresh() {
    this.intervalSubscription = interval(INTERVALLE_REFRESH).subscribe(() => {
      this.recupererInfosBatiments();
    });
  }

  ngOnDestroy(): void {
    this.intervalSubscription?.unsubscribe();
  }

}
