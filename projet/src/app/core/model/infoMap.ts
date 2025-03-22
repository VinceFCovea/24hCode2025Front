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
    coordX: number;
    /**
     * Position vertical de la case
     */
    coordY: number;
    biome: Biome;
    terrain: Terrain;
    batimentConstruit?: CaseBatiment;
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
