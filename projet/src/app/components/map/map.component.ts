import { Component } from '@angular/core';
import { Tile } from '../../models/tile.model';
import { MondeService } from '../../services/monde.service';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent {

  map: Tile[][] = [];
  flatMap: Tile[] = [];

  constructor(private mondeService: MondeService) {}

  ngOnInit(): void {
    this.mondeService.getMap().subscribe(data => {
      this.map = data;
      this.flatMap = this.map.flat();
    });
  }
}
