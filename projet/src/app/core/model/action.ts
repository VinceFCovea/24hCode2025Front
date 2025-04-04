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
import { ActionDetails } from './actionDetails';
import { NomAction } from './nomAction';
import { TypeAction } from './typeAction';

/**
 * Information sur une action
 */
export interface Action { 
    /**
     * Identifiant technique de l'action
     */
    idAction: string;
    nom: NomAction;
    /**
     * Temps de recharge en seconde du villageois après réalisation de l'action
     */
    cooldown: number;
    type: TypeAction;
    details?: ActionDetails;
}