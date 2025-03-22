import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BASE_URL_API, REQUEST_HEADERS } from "../../core/constants/core.constants";
import { Observable } from "rxjs";
import { InfoMap } from "../../core/model/infoMap";

@Injectable({
  providedIn: 'root'
})
export class MondeService {

  constructor(protected httpClient: HttpClient) {
  }

  recupererInfosMap(x_range_min: number, x_range_max: number, y_range_min: number, y_range_max: number): Observable<InfoMap[]> {
    return this.httpClient.get<InfoMap[]>(`${BASE_URL_API}/monde/map?x_range=${x_range_min},${x_range_max}&y_range=${y_range_min},${y_range_max}`, {headers: REQUEST_HEADERS});
  }


}
