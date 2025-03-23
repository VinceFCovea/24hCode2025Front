import { Component, OnInit } from '@angular/core';
import {ApiBackendService} from '../../../shared/services/api-backend.service';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';


@Component({
  selector: 'app-api-action',
  templateUrl: './api-action.component.html',
  styleUrls: ['./api-action.component.css'],
  imports: [
    FormsModule,
    CommonModule,
  ],
  standalone: true
})
export class ApiActionComponent implements OnInit {
  villageoisIds: string[] = ['17', '0d', 'c7', '1c'];
  selectedVillageoisId: string = '';

  constructor(private villageoisApiService: ApiBackendService) {}

  ngOnInit() {
  }

  moveVillageois(dest_x: number, dest_y: number) {
    this.villageoisApiService.moveVillageois(this.selectedVillageoisId, dest_x, dest_y).subscribe(
      response => {
        console.log('Villageois déplacé avec succès', response);
      },
      error => {
        console.error('Erreur lors du déplacement du villageois', error);
      }
    );
  }

  moveToResource(ressourceName: string) {
    this.villageoisApiService.moveToResource(this.selectedVillageoisId, ressourceName).subscribe(
      response => {
        console.log('Villageois se déplace vers la ressource', response);
      },
      error => {
        console.error('Erreur lors du déplacement vers la ressource', error);
      }
    );
  }

  buildConstruction(batiment: string) {
    this.villageoisApiService.buildConstruction(this.selectedVillageoisId, batiment).subscribe(
      response => {
        console.log('Construction lancée avec succès', response);
      },
      error => {
        console.error('Erreur lors de la construction', error);
      }
    );
  }

  moveAndBuild(batiment: string, dest_x: number, dest_y: number) {
    this.villageoisApiService.moveAndBuild(this.selectedVillageoisId, batiment, dest_x, dest_y).subscribe(
      response => {
        console.log('Villageois se déplace et commence la construction', response);
      },
      error => {
        console.error('Erreur lors du déplacement et de la construction', error);
      }
    );
  }

  recolteaResource(ressource: string) {
    this.villageoisApiService.recolteResource(this.selectedVillageoisId, ressource).subscribe(
      response => {
        console.log('Récolte lancée avec succès', response);
      },
      error => {
        console.error('Erreur lors de la récolte', error);
      }
    );
  }

  pauseVillageois() {
    this.villageoisApiService.pauseVillageois(this.selectedVillageoisId).subscribe(
      response => {
        console.log('Villageois mis en pause avec succès', response);
      },
      error => {
        console.error('Erreur lors de la mise en pause du villageois', error);
      }
    );
  }

  getCurrentAction() {
    this.villageoisApiService.getCurrentAction(this.selectedVillageoisId).subscribe(
      response => {
        console.log('Action en cours récupérée avec succès', response);
      },
      error => {
        console.error('Erreur lors de la récupération de l\'action en cours', error);
      }
    );
  }

  protected readonly Number = Number;
}
