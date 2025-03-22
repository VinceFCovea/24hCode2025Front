import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Ressource } from "../../core/model/ressource";
import { Observable } from "rxjs";
import { BASE_URL_API, REQUEST_HEADERS } from "../../core/constants/core.constants";

@Injectable({
  providedIn: 'root'
})
export class RessourcesService {

  constructor(protected httpClient: HttpClient) {
  }

  recupererListeRessources(): Observable<Ressource[]> {
    return this.httpClient.get<Ressource[]>(`${BASE_URL_API}/ressources`, {headers: REQUEST_HEADERS});
  }

}
