import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiBackendService {
  private apiUrl = 'http://10.110.5.153:3000/api';

  constructor(private http: HttpClient) {}

  moveVillageois(id: string, dest_x: number, dest_y: number): Observable<any> {
    const url = `${this.apiUrl}/villageois/move`;
    const body = { id, dest_x, dest_y };
    return this.http.post(url, body);
  }

  moveToResource(id_villageois: string, ressourceName: string): Observable<any> {
    const url = `${this.apiUrl}/villageois/movetoressource`;
    const body = { id_villageois, ressourceName };
    return this.http.post(url, body);
  }

  buildConstruction(id: string, batiment: string): Observable<any> {
    const url = `${this.apiUrl}/construction/build`;
    const body = { id, batiment };
    return this.http.post(url, body);
  }

  moveAndBuild(id: string, batiment: string, dest_x: number, dest_y: number): Observable<any> {
    const url = `${this.apiUrl}/construction/move-and-build`;
    const body = { id, batiment, dest_x, dest_y };
    return this.http.post(url, body);
  }

  recolteResource(id: string, ressource: string): Observable<any> {
    const url = `${this.apiUrl}/recolte/recolte`;
    const body = { id, ressource };
    return this.http.post(url, body);
  }

  pauseVillageois(id: string): Observable<any> {
    const url = `${this.apiUrl}/recolte/pause`;
    const body = { id };
    return this.http.post(url, body);
  }

  getCurrentAction(id: string): Observable<any> {
    const url = `${this.apiUrl}/villageois/action/${id}`;
    return this.http.get(url);
  }
}
