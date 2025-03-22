import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders}  from '@angular/common/http';
import { Observable } from 'rxjs';
import { Batiment } from '../../core/model/batiment';
import { BASE_URL_API, REQUEST_HEADERS } from '../../core/constants/core.constants';


@Injectable({
  providedIn: 'root'
})
export class BatimentsService {

    public defaultHeaders = new HttpHeaders();

    constructor(protected httpClient: HttpClient) {
    }

    recupererBatimentsDisponibles(): Observable<Batiment[]> {
      return this.httpClient.get<Batiment[]>(`${BASE_URL_API}/batiments/disponible`, {headers: REQUEST_HEADERS});
    }

    recupererBatiments(): Observable<Batiment[]> {
      return this.httpClient.get<Batiment[]>(`${BASE_URL_API}/batiments`, {headers: REQUEST_HEADERS});
    }

    recupererBatiment(idBatiment: string): Observable<Batiment> {
      return this.httpClient.get<Batiment>(`${BASE_URL_API}/batiments/${idBatiment}`, {headers: REQUEST_HEADERS});
    }


}
