import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  


  constructor(private http: HttpClient) { }


  getZonas() {
    return this.http.get('http://3.87.219.83:5000/dangerous_zone_clasification');
  }

  getAccidentes() {
    return this.http.get('http://3.87.219.83:5000/accident_probability')
  }

  getFlujo() {
    return this.http.head('http://3.87.219.83:5000/Concurrent_zone_clasification');
  }

}
