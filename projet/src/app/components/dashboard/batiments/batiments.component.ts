import { Component } from '@angular/core';
import { MondeService } from '../../../shared/services/monde.service';
import { CaseBatiment } from '../../../core/model/caseBatiment';
import { BatimentsService } from '../../../shared/services/batiments.service';
import { InfoMap } from '../../../core/model/infoMap';
import { NOTRE_ID_EQUIPE } from '../../../core/constants/core.constants';
import { CommonModule } from '@angular/common';
import { log } from 'console';
import { ProgressionPipe } from '../../../core/pipes/progression.pipe';
import { Batiment } from '../../../core/model/batiment';
import { BatimentRessource } from '../../../core/model/batimentRessource';

@Component({
  selector: 'app-batiments',
  imports: [CommonModule, ProgressionPipe],
  templateUrl: './batiments.component.html',
  styleUrl: './batiments.component.css'
})
export class BatimentsComponent {

  infoMap : InfoMap[] = [];
  batiments : string[] = [];
  listeBatiments?: Batiment[] = [];
  monEquipeId = NOTRE_ID_EQUIPE;
  couts?:BatimentRessource[]

  constructor(
    private mondeService: MondeService,
    private batimentService : BatimentsService,
  ) {}

  ngOnInit() {
      for (let i = 0; i < 33; i++) {
        this.mondeService.recupererInfosMap(0, 32, i, i).subscribe(infosMap => {
          const batiments = infosMap.filter(infoMap =>
            infoMap.batiment_construit && infoMap.batiment_construit.proprietaire.idEquipe === this.monEquipeId
          );
          this.infoMap = this.infoMap ? [...this.infoMap, ...batiments] : batiments;
          /*this.infoMap.map(map => {
            this.listeBatiments = map.batiment_construit?.detailBatiment;
            console.log(this.listeBatiments);
          })*/
        });
      }

      /*this.batimentService.recupererBatiments().subscribe((batiment) => {
        this.listeBatiments = batiment.map(bat => bat);
        this.couts = this.listeBatiments
        .map(bat => bat.coutParTour)
        .flat();
        this.couts.flatMap((cout) => {
          
        })
        console.log(this.couts);
      })*/

       /* this.batimentService.recupererBatiments().subscribe((batiment) => {
          this.listeBatiments = batiment.map(bat => bat);
          this.couts = this.listeBatiments
          .map(bat => bat.coutParTour)  
          .flat();  
        
          this.listeBatiments.forEach(bat => {
            console.log(`Couts pour le bâtiment ${bat.description}:`);
            bat.coutParTour.forEach(cout => {
              console.log(`- Ressource: ${cout.ressource}, Quantité: ${cout.quantite}`);
            });
          });
        
          console.log(this.couts);  
        });*/
      
      

  }

}
