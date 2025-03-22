import { Biome } from './biome';
import { CaseBatiment } from './caseBatiment';
import { CaseRessources } from './caseRessources';
import { Equipe } from './equipe';
import { Terrain } from './terrain';

/**
 * Une case de la map
 */
export interface InfoMap {
    /**
     * Position horizontale de la case
     */
    coord_x: number;
    /**
     * Position vertical de la case
     */
    coord_y: number;
    biome: Biome;
    terrain: Terrain;
    batiment_construit?: CaseBatiment;
    /**
     * Un indicateur qui indique si case est accessible (construction)
     */
    accessible: boolean;
    proprietaire: Equipe;
    /**
     * Ressources présente sur la case
     */
    ressources: Array<CaseRessources>;
}
