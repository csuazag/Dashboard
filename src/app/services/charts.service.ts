import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ChartsService {

  url = 'https://restcountries.eu/rest/v2/lang/es';

  constructor(private http: HttpClient) { }


  getJson() {
    this.http.get(this.url).subscribe(data => {
      console.log(data);
    });
  }


}
