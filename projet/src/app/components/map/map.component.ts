import { Component, HostListener, inject, OnDestroy, OnInit } from '@angular/core';
import { InfoMap } from '../../core/model/infoMap';
import { MondeService } from '../../shared/services/monde.service';
import { CommonModule } from '@angular/common';
import { TextureChargee } from '../../core/model/texture-chargee';
import { Villageois } from '../../core/model/villageois';
import { from, interval, Observable, of, switchMap, tap } from 'rxjs';
import { Application, Assets, BlurFilter, Filter, Sprite, Text, Texture } from 'pixi.js';
import { INTERVALLE_REFRESH, NOTRE_ID_EQUIPE, TAILLE_COTE_MAP } from '../../core/constants/core.constants';
import { EquipesService } from '../../shared/services/equipes.service';
import { VillageoisService } from '../../shared/services/villageois.service';
import { TileService } from '../../shared/services/tile.service';
import { OutlineFilter } from 'pixi-filters';
import {
  MatDialog
} from '@angular/material/dialog';
import { ModalComponent } from './modal/modal.component';
import { ProgressionPipe } from '../../core/pipes/progression.pipe';


@Component({
  selector: 'app-map',
  imports: [CommonModule],
  providers: [ProgressionPipe],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit, OnDestroy {

  app: any;
  readonly TAILLE_TILE = 48;
  intervalSubscription!: any;
  zoomLevel = 1;
  minZoom = 1;
  maxZoom = 3;

  dialog = inject(MatDialog);

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

    viewportTransform = {
      x: 0,
      y: 0,
      scale: 1
    }
    previousX = 0;
    previousY = 0;

    constructor(
        private readonly equipeService: EquipesService,
        private readonly villageoisService: VillageoisService,
        private readonly mondeService: MondeService,
        private readonly tileService: TileService,
        private readonly progressionPipe: ProgressionPipe
      ) {}


    ngOnInit(): void {

      this.recupererInfosEquipes().subscribe(_=> {
        this.initContext();
      });


    }




    // @HostListener('window:wheel', ['$event'])
    zoom(event: any) {
      const localX = event.clientX;
      const localY = event.clientY;

      // this.viewportTransform.x += localX - this.previousX;
      // this.viewportTransform.y += localY - this.previousY;

      this.previousX = localX;
      this.previousY = localY;

      if (event.deltaY < 0) {
        this.zoomLevel++;
        if (this.zoomLevel <= this.maxZoom) {
          this.viewportTransform.scale *= 1.5;
        } else {
          this.zoomLevel = this.maxZoom;
        }
      } else if (event.deltaY > 0) {
        this.zoomLevel--;
        if (this.zoomLevel >= this.minZoom) {
          this.viewportTransform.scale /= 1.5;
        } else {
          this.zoomLevel = this.minZoom;
        }
      }



      this.app.canvas.style.transform = `scale(${this.viewportTransform.scale})`;
      // setTransform(this.viewportTransform.scale, 0, 0, this.viewportTransform.scale, this.viewportTransform.x, this.viewportTransform.y);
    }



    recupererInfosEquipes() {
      return this.equipeService.recupererEquipes().pipe(
        tap(equipes => {
          this.equipes = equipes.map((equipe, index) => {return {id: equipe.idEquipe, nom: `${equipe.nom} [${equipe.type}]`, color: this.couleurs[index], colorHex: this.couleursHex[index], score: equipe?.ressources?.find(res => res.ressource.nom === 'POINT')?.quantite}});
          this.equipes.sort((a, b) => b.score - a.score);
        })
      );
    }


    initContext() {
          this.app = new Application();

          from(this.app.init({width: TAILLE_COTE_MAP * this.TAILLE_TILE, height: TAILLE_COTE_MAP * this.TAILLE_TILE})).pipe(
            tap(_ => {
              document.getElementById('map')!.appendChild(this.app.canvas);
              this.app.canvas.addEventListener('wheel', ($event: any) => {
                this.zoom($event);
              });
            }),
            switchMap(_ => {
              return of(this.afficherMap());
            })
          ).subscribe(
            () => {
              this.intervalSubscription = interval(INTERVALLE_REFRESH).pipe(
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
                  })
                  });
              }
            })

          ).subscribe();

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
                      const taillePolice = 14;
                      const text = new Text({
                        text: `${infoMap.coord_x},${infoMap.coord_y}`,
                        style: {
                          fontSize: `${taillePolice}px`,
                          fontWeight: 'bold',
                          fill: 'red'
                        }
                      });
                      if (sprite) {
                        if (true) { // outlineNecessaire
                          const equipeProprietaire = this.equipes.find(equipe => equipe.id === infoMap.batiment_construit?.proprietaire?.idEquipe);
                          const colorHex = equipeProprietaire?.colorHex || 0x000000;

                          sprite.filters = [new OutlineFilter({thickness: colorHex === 0x000000 ? 1 : 2, color: colorHex})];

                          sprite.on('click', () => {
                            const title = `(${infoMap.coord_x},${infoMap.coord_y})`;
                            let infos = `<p>=== Ressources ===</p>`;

                            for (const ressource of infoMap.ressources) {
                              infos += `<p>${ressource.ressource.nom} : ${ressource.quantite}</p>`;
                            }

                            const villageoisList = this.villageoisEquipePerso.filter(villageois => villageois.positionX === infoMap.coord_x && villageois.positionY === infoMap.coord_y);
                            villageoisList.forEach(villageois =>
                              infos += `<p>Villageois : ${villageois.idVillageois}</p>`
                            );

                            if (equipeProprietaire) {
                              infos += `<p>Equipe propriétaire : ${equipeProprietaire.nom}</p>`;
                            }

                            if (infoMap.batiment_construit) {
                              const progression = this.progressionPipe.transform(infoMap);
                              infos += `<p>Bâtiment : ${infoMap.batiment_construit.detailBatiment.type}. Progression : ${progression} %</p>`;
                              // if (progression === 100) {
                              //   sprite.filters = [new BlurFilter({ strength: 16 })];
                              // }
                            }

                            this.openDialog(title, infos);
                            // alert(infos);
                          });

                          sprite.on('mouseover', () => {
                            sprite.filters = [new OutlineFilter({thickness: 2, color: 0xffffff})];
                            this.app.stage.addChild(text);
                          });

                          sprite.on('mouseout', () => {
                            sprite.filters = [new OutlineFilter({thickness: 1, color: colorHex})];
                            this.app.stage.removeChild(text);
                          });





                        }
                        sprite.height = this.TAILLE_TILE;
                        sprite.width = this.TAILLE_TILE;
                        sprite.x = infoMap.coord_x * this.TAILLE_TILE;
                        sprite.y = 32 * this.TAILLE_TILE - infoMap.coord_y * this.TAILLE_TILE;
                        text.x = sprite.x + (this.TAILLE_TILE / 2) - taillePolice;
                        text.y = sprite.y + (this.TAILLE_TILE / 2) - (taillePolice / 2);
                        this.app.stage.addChild(sprite);
                      }
                    })
                  );
              } else {
                return of(null);
              }
            }

            openDialog(title: string, infos: string) {
              this.dialog.open(ModalComponent, {
                data: {
                  title,
                  infos
                },
              });
            }



    ngOnDestroy(): void {
      this.intervalSubscription?.unsubscribe();
    }
}
