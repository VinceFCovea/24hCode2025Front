import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tile } from '../models/tile.model';

@Injectable({
  providedIn: 'root'
})
export class MondeService {
  private baseUrl = 'http://<votre-url-api>'; // à remplacer

  constructor(private http: HttpClient) {}

  getMap(): Observable<Tile[][]> {
    return this.http.get<Tile[][]>(`${this.baseUrl}/monde/map`);
  }
}
