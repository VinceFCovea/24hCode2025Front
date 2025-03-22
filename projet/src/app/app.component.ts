import { Component, OnInit } from '@angular/core';
import { EquipesService } from './shared/services/equipes.service';
import { NOTRE_ID_EQUIPE } from './core/constants/core.constants';
import { VillageoisService } from './shared/services/villageois.service';
import { DemandeAction } from './core/model/demandeAction';
import { NomAction } from './core/model/nomAction';
import { from, interval, Observable, of, switchMap, tap } from 'rxjs';
import { EquipeRessource } from './core/model/equipeRessource';
import { CommonModule } from '@angular/common';
import { Application, Assets, Sprite, Text, Texture } from 'pixi.js';
import { OutlineFilter } from 'pixi-filters';
import { MondeService } from './shared/services/monde.service';
import { InfoMap } from './core/model/infoMap';
import { TileService } from './shared/services/tile.service';
import { TextureChargee } from './core/model/texture-chargee';
import { Villageois } from './core/model/villageois';

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
  readonly INTERVALLE_REFRESH = 12500;

  texturesChargees: TextureChargee[] = [];
  villageoisEquipePerso: Villageois[] = [];
  equipes: any[] = [];

  couleurs = [
    '#561ED3',
    '#8ABC88',
    '#A08ADF',
    '#1C21D8',
    '#92BC9D',
    '#771ABA',
    '#ED2189',
    '#245B82',
    '#730F74',
    '#0ADB5B',
    '#23E77F',
    '#348579',
    '#9C13E0',
    '#CD6781',
    '#3F24A0',
    '#204509'
  ];

  couleursHex = [
    0x561ED3,
    0x8ABC88,
    0xA08ADF,
    0x1C21D8,
    0x92BC9D,
    0x771ABA,
    0xED2189,
    0x245B82,
    0x730F74,
    0x0ADB5B,
    0x23E77F,
    0x348579,
    0x9C13E0,
    0xCD6781,
    0x3F24A0,
    0x204509
  ];




  constructor(
    private readonly equipeService: EquipesService,
    private readonly villageoisService: VillageoisService,
    private readonly mondeService: MondeService,
    private readonly tileService: TileService
  ) {}

    ngOnInit(): void {

      this.recupererInfosResources().subscribe();
      this.recupererInfosEquipes().subscribe();

      // setInterval(_ => {
      //   this.recupererInfosResources().subscribe();
      //   this.recupererInfosEquipes().subscribe();
      // }, this.INTERVALLE_REFRESH);

      const demandeAction: DemandeAction = {
        action: NomAction.RECOLTER,
        reference: 'CHARBON'
      };

      this.initContext();
    }

    recupererInfosEquipes() {
      return this.equipeService.recupererEquipes().pipe(
        tap(equipes => {
          this.equipes = equipes.map((equipe, index) => {return {id: equipe.idEquipe, nom: `${equipe.nom} [${equipe.type}]`, color: this.couleurs[index], colorHex: this.couleursHex[index], score: equipe?.ressources?.find(res => res.ressource.nom === 'POINT')?.quantite}});
          this.equipes.sort((a, b) => b.score - a.score);
        })
      );
    }

    recupererInfosResources() {
      return this.equipeService.recupererEquipe(NOTRE_ID_EQUIPE).pipe(
        tap(
        (equipe) => {
          this.data = equipe.nom;
          this.ressources = equipe.ressources!;
        }
      ));
    }


    initContext() {
      this.app = new Application();

      from(this.app.init({ background: '#1099bb', width: 2112, height: 2112})).pipe(
        tap(_ => {
          document.body.appendChild(this.app.canvas);
        }),
        switchMap(_ => {
          return of(this.afficherMap());
        })
      ).subscribe(
        () => {
          interval(this.INTERVALLE_REFRESH).pipe(
            tap(_ => {
              this.afficherMap();
            })
          ).subscribe();
        }
      );
    }

    afficherMap() {
      // console.log('Affichage de la map');
      this.villageoisService.recupererListeVillageoisEquipe(NOTRE_ID_EQUIPE).pipe(
        tap(villageoisList => {
          this.villageoisEquipePerso = villageoisList;
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
        })

      ).subscribe();

    }

    private afficherSprite(infoMap: InfoMap, imagePath: string, outlineNecessaire = false): Observable<any> {
      if (!!imagePath) {
        const texturePreChargee = this.texturesChargees.find(textureChargee => textureChargee.nomImage === imagePath)?.texture;
        const texture$ = !!texturePreChargee ? of(texturePreChargee) : from(Assets.load(imagePath));

        return texture$.pipe(
          tap(
            texture => {
              if (!texturePreChargee) {
                this.texturesChargees.push({nomImage: imagePath, texture});
              }
              const sprite = new Sprite({texture, interactive: true});
              if (sprite) {
                if (true) { // outlineNecessaire
                  const colorHex = this.equipes.find(equipe => equipe.id === infoMap.batiment_construit?.proprietaire?.idEquipe)?.colorHex || 0x000000;

                  sprite.filters = [new OutlineFilter({thickness: colorHex === 0x000000 ? 1 : 2, color: colorHex})];

                  sprite.on('click', () => {
                    alert(`Coordonnées : ${infoMap.coord_x},${infoMap.coord_y}`);
                  });

                  sprite.on('mouseover', () => {
                    sprite.filters = [new OutlineFilter({thickness: 2, color: 0xffffff})];
                  });

                  sprite.on('mouseout', () => {
                    sprite.filters = [new OutlineFilter({thickness: 1, color: colorHex})];
                  });
                }
                sprite.height = this.TAILLE_TILE;
                sprite.width = this.TAILLE_TILE;
                sprite.x = infoMap.coord_x * this.TAILLE_TILE;
                sprite.y = 32 * this.TAILLE_TILE - infoMap.coord_y * this.TAILLE_TILE;
                this.app.stage.addChild(sprite);
              }
            })
          );
      } else {
        return of(null);
      }
    }


    afficherInfoMap(infoMap: InfoMap) {
      this.afficherSprite(infoMap, this.tileService.determinerTilePourBiome(infoMap.biome), true).pipe(
        switchMap(_ => {
          return this.afficherSprite(infoMap, this.tileService.determinerTilePourTerrain(infoMap.terrain));
        }),
        switchMap(_ => {
          let imagePath = '';
          if (infoMap?.batiment_construit?.detailBatiment) {
            imagePath = this.tileService.determinerTilePourBatiment(infoMap.batiment_construit.detailBatiment);
          }

          return this.afficherSprite(infoMap, imagePath);
        })
      ).subscribe(
        _ => {
          this.afficherVillageoisSiNecessaire(infoMap);
        }
      );
    }



    afficherVillageoisSiNecessaire(infoMap: InfoMap) {
      this.villageoisEquipePerso.forEach(villageois => {
        if (villageois.positionX === infoMap.coord_x && villageois.positionY === infoMap.coord_y) {
          const villageoisImagePath = this.tileService.recupererTileVillageois();
          this.afficherSprite(infoMap, villageoisImagePath).subscribe();
        }
      });
    }


}
