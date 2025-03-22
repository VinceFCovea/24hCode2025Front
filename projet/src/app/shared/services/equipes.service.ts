import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Equipe } from "../../core/model/equipe";
import { BASE_URL_API, REQUEST_HEADERS } from "../../core/constants/core.constants";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EquipesService {

  constructor(protected httpClient: HttpClient) {
  }

  recupererEquipes(): Observable<Equipe[]> {
    return this.httpClient.get<Equipe[]>(`${BASE_URL_API}/equipes`, {headers: REQUEST_HEADERS});
  }

  recupererEquipe(idEquipe: string): Observable<Equipe> {
    return this.httpClient.get<Equipe>(`${BASE_URL_API}/equipes/${idEquipe}`, {headers: REQUEST_HEADERS});
  }

}
