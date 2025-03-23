import { Component, OnInit } from '@angular/core';
import { ApiBackendService } from '../../../shared/services/api-backend.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
  buildings: string[] = [
    'CABANE_DE_BUCHERON', 'SCIERIE', 'ATELIER_DE_TAILLE_DE_PIERRE', 'CARRIERE',
    'EXCAVATRICE_A_FER', 'MINE_DE_FER', 'ATELIER_DE_CHARBONNIER', 'MINE_DE_CHARBON',
    'MOULIN', 'FERME', 'PORT', 'EOLIENNE', 'CENTRALE_ELECTRIQUE_AU_CHARBON',
    'CENTRALE_AU_METHANE', 'CENTRALE_A_BIOMASSE', 'TURBINE_HYDRAULIQUE',
    'INSTALLATION_FORESTIERE', 'USINE_DE_RENOUVELLEMENT', 'PUITS_DE_CARBONE',
    'TOUR_DE_GUET', 'OBSERVATOIRE', 'MARCHE', 'MUSEE', 'BIBLIOTHEQUE', 'THEATRE',
    'GRANDE_STATUE', 'CAPITOLE', 'BATEAU_DE_CROISIERE', 'GRANDE_BIBLIOTHEQUE',
    'CHATEAU', 'REACTEUR_A_FUSION_NUCLEAIRE'
  ];
  filteredBuildings: string[] = [];
  filteredMoveBuildings: string[] = [];
  selectedBuilding: string = '';
  selectedMoveBuilding: string = '';

  constructor(private villageoisApiService: ApiBackendService) {}

  ngOnInit() {
    this.filteredBuildings = this.buildings;
    this.filteredMoveBuildings = this.buildings;
  }

  filterBuildings() {
    if (this.selectedBuilding) {
      this.filteredBuildings = this.buildings.filter(building =>
          building.toLowerCase().includes(this.selectedBuilding.toLowerCase())
      );
    } else {
      this.filteredBuildings = this.buildings;
    }
  }

  filterMoveBuildings() {
    if (this.selectedMoveBuilding) {
      this.filteredMoveBuildings = this.buildings.filter(building =>
          building.toLowerCase().includes(this.selectedMoveBuilding.toLowerCase())
      );
    } else {
      this.filteredMoveBuildings = this.buildings;
    }
  }

  selectBuilding(building: string) {
    this.selectedBuilding = building;
  }

  selectMoveBuilding(building: string) {
    this.selectedMoveBuilding = building;
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
