import { Component } from '@angular/core';
import { MondeService } from '../../../shared/services/monde.service';
import { CaseBatiment } from '../../../core/model/caseBatiment';
import { BatimentsService } from '../../../shared/services/batiments.service';
import { InfoMap } from '../../../core/model/infoMap';
import { NOTRE_ID_EQUIPE } from '../../../core/constants/core.constants';
import { CommonModule } from '@angular/common';
import { log } from 'console';
import { ProgressionPipe } from '../../../core/pipes/progression.pipe';

@Component({
  selector: 'app-batiments',
  imports: [CommonModule, ProgressionPipe],
  templateUrl: './batiments.component.html',
  styleUrl: './batiments.component.css'
})
export class BatimentsComponent {

  infoMap : InfoMap[] = [];
  batiment?: string;
  monEquipeId = NOTRE_ID_EQUIPE;

  constructor(private mondeService: MondeService) {}

  ngOnInit() {
      for (let i = 0; i < 33; i++) {
        this.mondeService.recupererInfosMap(0, 32, i, i).subscribe(infosMap => {
          const batiments = infosMap.filter(infoMap =>
            infoMap.batiment_construit && infoMap.batiment_construit.proprietaire.idEquipe === this.monEquipeId
          );
          this.infoMap = this.infoMap ? [...this.infoMap, ...batiments] : batiments;
          this.infoMap.map(map => {
            this.batiment = map.batiment_construit?.detailBatiment.description;
          })
        });
        
      }

  }

}
