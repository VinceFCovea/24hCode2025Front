import { Pipe, PipeTransform } from '@angular/core';
import { InfoMap } from '../model/infoMap';
@Pipe({
  name: 'progression',
})
export class ProgressionPipe implements PipeTransform {
  transform(infoMap: InfoMap): number {
    if (!infoMap?.batiment_construit) {
      return 0;
    } else {
      const caseBatiment = infoMap.batiment_construit;
      return ((caseBatiment?.detailBatiment?.tempsConstruction ?? 0) - (caseBatiment?.progression ?? 0)) / caseBatiment?.detailBatiment?.tempsConstruction * 100
    }
  }
}
