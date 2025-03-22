import { Component, OnInit } from '@angular/core';
import { EquipesService } from './shared/services/equipes.service';
import { NOTRE_ID_EQUIPE } from './core/constants/core.constants';
import { VillageoisService } from './shared/services/villageois.service';
import { DemandeAction } from './core/model/demandeAction';
import { NomAction } from './core/model/nomAction';
import { from, interval, switchMap } from 'rxjs';
import { EquipeRessource } from './core/model/equipeRessource';
import { CommonModule } from '@angular/common';
import { Application, Assets, Sprite, Text } from 'pixi.js';
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

      from(this.app.init({ background: '#1099bb', width: 2112, height: 2112})).subscribe(
        () => {
          document.body.appendChild(this.app.canvas);
          this.afficherMap();
        }
      );
    }

    afficherMap() {

      for (let i = 0; i < 33; i++) {
        this.mondeService.recupererInfosMap(0, 32, i, i).subscribe(infosMap => {
          infosMap.forEach(infoMap => {
            this.afficherInfoMap(infoMap);

            // const text = new Text({
            //   text: `${infoMap.coord_x},${infoMap.coord_y}`,});
            // text.x = infoMap.coord_x * this.TAILLE_TILE;
            // text.y = 64;
            // this.app.stage.addChild(text);
          })
          });
      }

    }

    afficherInfoMap(infoMap: InfoMap) {

      // TODO : optimisation pour éviter de charger plusieurs fois la même texture

      const biomeImagePath = this.tileService.determinerTilePourBiome(infoMap.biome);

      if (!!biomeImagePath) {
        from(Assets.load(biomeImagePath)).subscribe(
          texture => {
            const biome = new Sprite({texture});
            this.app.stage.addChild(biome);
            biome.height = this.TAILLE_TILE;
            biome.width = this.TAILLE_TILE;
            biome.x = infoMap.coord_x * this.TAILLE_TILE;
            biome.y = infoMap.coord_y * this.TAILLE_TILE;

            const terrainImagePath = this.tileService.determinerTilePourTerrain(infoMap.terrain);
            if (!!terrainImagePath) {
              from(Assets.load(terrainImagePath)).subscribe(
                texture => {
                  const terrain = new Sprite(texture);
                  this.app.stage.addChild(terrain);
                  terrain.height = this.TAILLE_TILE;
                  terrain.width = this.TAILLE_TILE;
                  terrain.x = infoMap.coord_x * this.TAILLE_TILE;
                  terrain.y = infoMap.coord_y * this.TAILLE_TILE;

                  if (infoMap.batiment_construit) {
                    const batimentImagePath = this.tileService.determinerTilePourBatiment(infoMap.batiment_construit.detailBatiment);

                    if (!!batimentImagePath) {
                      from(Assets.load(batimentImagePath)).subscribe(
                        texture => {
                          const batiment = new Sprite(texture);
                          this.app.stage.addChild(batiment);
                          batiment.height = this.TAILLE_TILE;
                          batiment.width = this.TAILLE_TILE;
                          batiment.x = infoMap.coord_x * this.TAILLE_TILE;
                          batiment.y = infoMap.coord_y * this.TAILLE_TILE;

                          this.afficherVillageoisSiNecessaire(infoMap);
                        }
                      );
                    }
                  } else {
                    this.afficherVillageoisSiNecessaire(infoMap);
                  }



                }
              );
            }


          }
        );
      }


    }



    afficherVillageoisSiNecessaire(infoMap: InfoMap) {
      this.villageoisService.recupererListeVillageoisEquipe(NOTRE_ID_EQUIPE).subscribe(
        villageois => {
          villageois.forEach(villageois => {
            if (villageois.positionX === infoMap.coord_x && villageois.positionY === infoMap.coord_y) {
              const villageoisImagePath = this.tileService.recupererTileVillageois();
              from(Assets.load(villageoisImagePath)).subscribe(
                texture => {
                  const villageoisSprite = new Sprite(texture);
                  this.app.stage.addChild(villageoisSprite);
                  villageoisSprite.height = this.TAILLE_TILE;
                  villageoisSprite.width = this.TAILLE_TILE;
                  villageoisSprite.x = infoMap.coord_x * this.TAILLE_TILE;
                  villageoisSprite.y = infoMap.coord_y * this.TAILLE_TILE;
                }
              );
            }
          });
        });
    }


}
