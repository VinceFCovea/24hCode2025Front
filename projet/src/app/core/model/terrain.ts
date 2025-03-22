/**
 * 24h2025
 * Contrat API des 24h du code 2025.   Version Participant.
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { TerrainRessource } from './terrainRessource';

/**
 * Détail sur un terrai
 */
export interface Terrain { 
    /**
     * Identifiant technique du terrai
     */
    identifiant: string;
    /**
     * Nom du terrain
     */
    nom: string;
    /**
     * Description du terrain
     */
    description: string;
    /**
     * La liste des ressources présente sur la case initialement
     */
    ressourcesPresente: Array<TerrainRessource>;
}