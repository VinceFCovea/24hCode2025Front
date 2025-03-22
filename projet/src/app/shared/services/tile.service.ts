import { Injectable } from "@angular/core";
import { Biome } from "../../core/model/biome";
import { Batiment } from "../../core/model/batiment";
import { NomBatiment } from "../../core/model/nomBatiment";
import { Terrain } from "../../core/model/terrain";

@Injectable({
  providedIn: 'root'
})
export class TileService {

  determinerTilePourBiome(biome: Biome): string {
    const prefixe = 'assets/tiles/';

    switch (biome.nom) {
      case 'Plaine':
        return `${prefixe}plaine.png`;
      case 'Désert':
        return `${prefixe}desert.png`;
      case 'Lac':
        return `${prefixe}lac.png`;
      default:
        return '';
    }
  }


  recupererTileVillageois(): string {
    return 'assets/villagers/villager.png';
  }


  determinerTilePourBatiment(batiment: Batiment | undefined): string {
    const prefixe = 'assets/buildings/';

    switch (batiment?.type) {
      case NomBatiment.ATELIERDECHARBONNIER:
        return `${prefixe}atelier_de_charbonnier.png`;
      case NomBatiment.ATELIERDETAILLEDEPIERRE:
        return `${prefixe}atelier_de_taille_de_pierre.png`;
      case NomBatiment.BATEAUDECROISIERE:
        return `${prefixe}bateau_de_croisiere.png`;
      case NomBatiment.BIBLIOTHEQUE:
        return `${prefixe}bibliotheque.png`;
      case NomBatiment.CABANEDEBUCHERON:
        return `${prefixe}cabane_bucheron.png`;
      case NomBatiment.CAPITOLE:
        return `${prefixe}capitole.png`;
      case NomBatiment.CARRIERE:
        return `${prefixe}carriere.png`;
      case NomBatiment.CENTRALEABIOMASSE:
        return `${prefixe}centrale_a_biomasse.png`;
      case NomBatiment.CENTRALEAUMETHANE:
        return `${prefixe}centrale_au_methane.png`;
      case NomBatiment.CENTRALEELECTRIQUEAUCHARBON:
        return `${prefixe}centrale_electrique_au_charbon.png`;
      case NomBatiment.CHATEAU:
        return `${prefixe}chateau.png`;
      case NomBatiment.EXCAVATRICEAFER:
        return `${prefixe}excavatrice_a_fer.png`;
      case NomBatiment.FERME:
        return `${prefixe}ferme.png`;
      case NomBatiment.GRANDEBIBLIOTHEQUE:
        return `${prefixe}grande_bibliotheque.png`;
      case NomBatiment.GRANDESTATUE:
        return `${prefixe}grande_statue.png`;
      case NomBatiment.INSTALLATIONFORESTIERE:
        return `${prefixe}installation_forestiere.png`;
      case NomBatiment.MINEDECHARBON:
        return `${prefixe}mine_de_charbon.png`;
      case NomBatiment.MINEDEFER:
        return `${prefixe}mine_de_fer.png`;
      case NomBatiment.EOLIENNE:
        return `${prefixe}moulin_a_vent.png`;
      case NomBatiment.MOULIN:
        return `${prefixe}moulin.png`;
      case NomBatiment.MUSEE:
        return `${prefixe}musee.png`;
      case NomBatiment.OBSERVATOIRE:
        return `${prefixe}observatoire.png`;
      case NomBatiment.PORT:
        return `${prefixe}port.png`;
      case NomBatiment.PUITSDECARBONE:
        return `${prefixe}puits_de_carbone.png`;
      case NomBatiment.REACTEURAFUSIONNUCLEAIRE:
        return `${prefixe}reacteur_a_fusion_nucleaire.png`;
      case NomBatiment.SCIERIE:
        return `${prefixe}scierie.png`;
      case NomBatiment.THEATRE:
        return `${prefixe}theatre.png`;
      case NomBatiment.TOURDEGUET:
        return `${prefixe}tour_de_guet.png`;
      case NomBatiment.TURBINEHYDRAULIQUE:
        return `${prefixe}turbine_hydraulique.png`;
      case NomBatiment.USINEDERENOUVELLEMENT:
        return `${prefixe}usine_de_renouvellement.png`;
      default:
        return '';
    }
  }

  determinerTilePourTerrain(terrain: Terrain): string {
    const prefixe = 'assets/nature/';

    switch (terrain.nom) {
      case 'Bosquet':
        return `${prefixe}bosquet.png`;
      case 'Forêt':
        return `${prefixe}forêt.png`;
      case 'Gisement de charbon':
        return `${prefixe}gisement_de_charbon.png`;
      case 'Gisement de minerais':
        return `${prefixe}gisement_de_minerais.png`;
      case 'Petit bois et amas rocheux':
        return `${prefixe}petit_bois_et_amas_rocheux.png`;
      case 'Rochers':
        return `${prefixe}rochers.png`;
      default:
        return '';
    }
  }



}
