import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BASE_URL_API, REQUEST_HEADERS } from "../../core/constants/core.constants";
import { Villageois } from "../../core/model/villageois";

@Injectable({
  providedIn: 'root'
})
export class VillageoisService {

  constructor(protected httpClient: HttpClient) {
  }

  recupererListeVillageoisEquipe(idEquipe: string): Observable<Villageois[]> {
    return this.httpClient.get<Villageois[]>(`${BASE_URL_API}/equipes/${idEquipe}/villageois`, {headers: REQUEST_HEADERS});
  }

  recupererVillageoisEquipe(idEquipe: string, idVillageois: string): Observable<Villageois> {
    return this.httpClient.get<Villageois>(`${BASE_URL_API}/equipes/${idEquipe}/villageois/${idVillageois}`, {headers: REQUEST_HEADERS});
  }

}
