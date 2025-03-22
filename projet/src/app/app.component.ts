import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EquipesService } from './shared/services/equipes.service';
import { NOTRE_ID_EQUIPE } from './core/constants/core.constants';
import { VillageoisService } from './shared/services/villageois.service';
import { DemandeAction } from './core/model/demandeAction';
import { NomAction } from './core/model/nomAction';
import { from, interval, switchMap } from 'rxjs';
import { EquipeRessource } from './core/model/equipeRessource';
import { CommonModule } from '@angular/common';
import { Application, Assets, Sprite } from 'pixi.js';
import { loadTextures } from 'pixi.js';
import { MondeService } from './shared/services/monde.service';
import { InfoMap } from './core/model/infoMap';
import { TileService } from './shared/services/tile.service';

@Component({
  selector: 'app-root',
  imports: [ CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'projet';
  data!: string;
  ressources!: Array<EquipeRessource>;
  app: any;
  readonly TAILLE_TILE = 64;



  constructor(
    private readonly equipeService: EquipesService,
    private readonly villageoisService: VillageoisService,
    private readonly mondeService: MondeService,
    private readonly tileService: TileService
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

      this.initContext();
    }


    initContext() {
      this.app = new Application();

      from(this.app.init({ background: '#1099bb'})).subscribe(
        () => {
          document.body.appendChild(this.app.canvas);
          this.afficherMap();
        }
      );
    }

    afficherMap() {
      this.mondeService.recupererInfosMap(0, 10, 0, 0).subscribe(infosMap => {
        infosMap.forEach(infoMap => {
          this.afficherInfoMap(infoMap);
        })
        });
    }

    afficherInfoMap(infoMap: InfoMap) {
      const biomeImagePath = this.tileService.determinerTilePourBiome(infoMap.biome);

      if (!!biomeImagePath) {
        from(Assets.load(biomeImagePath)).subscribe(
          texture => {
            const biome = new Sprite(texture);
            this.app.stage.addChild(biome);
            biome.height = this.TAILLE_TILE;
            biome.width = this.TAILLE_TILE;
            biome.x = infoMap.coord_x * this.TAILLE_TILE;
            biome.y = infoMap.coord_y * this.TAILLE_TILE;
          }
        );
      }


    }




}
