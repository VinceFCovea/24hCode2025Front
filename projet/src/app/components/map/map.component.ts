import { Component } from '@angular/core';
import { InfoMap } from '../../core/model/infoMap';
import { MondeService } from '../../shared/services/monde.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-map',
  imports: [CommonModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent {

  map: InfoMap[][] = [];
  flatMap: InfoMap[] = [];

  constructor(private mondeService: MondeService) {}

  ngOnInit(): void {
    this.mondeService.recupererInfosMap(0, 32, 0, 32).subscribe(data => {
      this.map = this.transformTo2D(data);
      this.flatMap = data;
    });
  }

  private transformTo2D(data: InfoMap[]): InfoMap[][] {
    const size = 33;
    const grid: InfoMap[][] = Array.from({ length: size }, () => []);
    data.forEach(tile => {
      if (tile.coordY < size && tile.coordX < size) {
        grid[tile.coordY][tile.coordX] = tile;
      }
    });
    return grid;
  }
}
