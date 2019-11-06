import { Component, OnInit } from '@angular/core';
import { MapService } from '../services/map.service';
import * as decodePolyline from 'decode-google-map-polyline';



interface Marker {
    Borough: string,
    Name: string,
    label: string,
    latitude: string,
    longitude: string,
    color: any
}

interface Route {
    Borough: string
    Name: string
    label: string
    latitude: number,
    longitude: number,
    routes: any[]
}

@Component({
    selector: 'app-maps',
    templateUrl: './maps.component.html',
    styleUrls: ['./maps.component.css']
})

export class MapsComponent implements OnInit {

    /**  ZONAS   */
    showGreen = true;
    showMarkers = true;

    hideMarkers = 'show';
    zona = 'segura';

    allMarkersGreen: Marker[] = [];
    allMarkersRed: Marker[] = [];
    allMarkers: Marker[] = [];

    lat = 40.7142715;
    lng = -74.0059662;

    /** ZONAS */

    /** FLUJO */

    allRoutesInfo: Route[] = [];
    allRoutesTraks: any[] = [];

    allRoutesConcurridaInfo: Route[] = [];
    allRoutesConcurridaTracks: any[] = [];

    allRoutesVaciaInfo: Route[] = [];
    allRoutesVaciaTracks: any[] = []



    constructor(private mapService: MapService) {

        this.mapService.getFlujo().subscribe(data => {
            for (let i = 0; i < data['data'].length; i++) {
                const type = data['data'][i]['label'];

                if (type === 'Concurrida') {
                    this.allRoutesConcurridaInfo.push(data['data'][i]);
                    this.allRoutesConcurridaTracks.push(this.decode(data['data'][i]['routes']));

                } else if (type === 'Vacia') {
                    this.allRoutesVaciaInfo.push(data['data'][i]);
                    this.allRoutesVaciaTracks.push(this.decode(data['data'][i]['routes']));
                }
            }


            console.log(this.allRoutesConcurridaInfo);
            console.log(this.allRoutesConcurridaTracks);




        });

        /**
          
         
        this.mapService.getZonas().subscribe(data => {
            this.allMarkers = data['data'];
            for (let i = 0; i < data['data'].length; i++) {
                const label = data['data'][i]['label'];
 
                if (label == 'Segura') {
                    this.allMarkersGreen.push(data['data'][i]);
 
                } else if (label == 'Peligrosa') {
                    this.allMarkersRed.push(data['data'][i]); 
                }
            }            
        });
*/
    }

    ngOnInit() {

    }

    setRadioZona() {
        if (this.zona === 'segura') {
            this.showGreen = true;
        } else {
            this.showGreen = false;
        }
    }

    setRadioMarkers() {
        if (this.hideMarkers === 'show') {
            this.showMarkers = true;
        } else {
            this.showMarkers = false;
        }
    }

    decode(cadena: string[]) {
        let newArray = [];

        for (let i = 0; i < cadena.length; i++) {
            newArray.push(decodePolyline(cadena[i]));
        }

        return newArray;
    }



}

