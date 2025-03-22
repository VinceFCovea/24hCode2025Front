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

/**
 * Type de villageois. Contient les caractéristiques de ce dernier.
 */
export interface TypeVillageois { 
    /**
     * Nom du type
     */
    nom: TypeVillageois.NomEnum;
    /**
     * Description du type de villageois
     */
    description: string;
    /**
     * Multiplication du cooldown des actions.   Une valeur positive indique que le villageois est plus lent pour réaliser des actions, tandis qu'une valeur négative indique qu'il est plus rapide.
     */
    mutliplicateurDeCooldown: number;
}
export namespace TypeVillageois {
    export type NomEnum = 'PEON' | 'PEON_MALADE';
    export const NomEnum = {
        PEON: 'PEON' as NomEnum,
        PEONMALADE: 'PEON_MALADE' as NomEnum
    };
}