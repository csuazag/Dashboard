import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ChartsService {





  constructor(private http: HttpClient) { }


  getMetaData() {
    return this.http.get('http://3.87.219.83:5000/metadata');
  }

  getChartDayxHour(day) {

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    const params = new HttpParams().set('day', day);

    return this.http.get('http://3.87.219.83:5000/speed_vs_time', { headers: headers, params: params });
  }

}


/*export interface MetaData {
  average_speed: number
  average_time: number
  total_accidents: number
  total_dead: number
  total_injured: number
  total_subZones: number
  total_vehicles: number
  total_zones: number
}*/
