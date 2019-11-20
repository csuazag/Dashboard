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
    showGreen;
    showMarkers;
    hideMarkers;
    zona;

    allMarkersGreen: Marker[] = [];
    allMarkersRed: Marker[] = [];
    allMarkers: Marker[] = [];

    lat = 40.7142715;
    lng = -74.0059662;

    /** ZONAS */

    /** FLUJO */

    

    allRoutesInfo: Route[] = [];
    allRoutesTraks: any[] = [];

    allRoutesConcurridaInfo: Route[] = []; // Trafico Lento! osea Rojo
    allRoutesConcurridaTracks: any[] = [];
    markersConcurridaTracks: any[] = [];

    allRoutesVaciaInfo: Route[] = []; // Trafico Rapido! osea Verde
    allRoutesVaciaTracks: any[] = [];
    markersVaciaTracks: any[] = [];

    showRoutesGreen;
    showMarkersFlujo;
    flujo;
    hideMarkersFlujo;
    




    constructor(private mapService: MapService) {

        this.showGreen = true;
        this.showMarkers = true;
        this.hideMarkers = 'show';
        this.zona = 'segura';

        this.showRoutesGreen = true;
        this.showMarkersFlujo = true;
        this.flujo = 'vacia';
        this.hideMarkersFlujo = 'show';

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

            this.putMarkersRoutes();
        });




        this.mapService.getZonas().subscribe(data => {
            this.allMarkers = data['data'];
            for (let i = 0; i < data['data'].length; i++) {
                const label = data['data'][i]['label'];

                if (label === 'Segura') {
                    this.allMarkersGreen.push(data['data'][i]);

                } else if (label === 'Peligrosa') {
                    this.allMarkersRed.push(data['data'][i]);
                }
            }
        });

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

    decode(cadena: any[]) {
        let newArray = [];

        for (let i = 0; i < cadena.length; i++) {
            newArray.push(decodePolyline(cadena[i][0]));

            for (let j = 0; j < newArray[i].length; j++) {
                newArray[i][j]['origin'] = cadena[i][1];
                newArray[i][j]['destiny'] = cadena[i][2];
            }
        }



        return newArray;
    }


    putMarkersRoutes() {
        for (let i = 0; i < this.allRoutesConcurridaTracks.length; i++) {
            for (let j = 0; j < this.allRoutesConcurridaTracks[i].length; j++) {
                //const index = Math.round(this.allRoutesConcurridaTracks[i][j].length / 2) - 1;
                const index = 0;

                const json = {
                    lat: this.allRoutesConcurridaTracks[i][j][index].lat,
                    lng: this.allRoutesConcurridaTracks[i][j][index].lng,
                    origin: this.allRoutesConcurridaTracks[i][j][index].origin,
                    destiny: this.allRoutesConcurridaTracks[i][j][index].destiny,
                    borough: this.allRoutesConcurridaInfo[i].Borough,
                    name: this.allRoutesConcurridaInfo[i].Name,
                    label: this.allRoutesConcurridaInfo[i].label
                }

                this.markersConcurridaTracks.push(json);
                //console.log(this.markersConcurridaTracks);
            }
        }

        for (let i = 0; i < this.allRoutesVaciaTracks.length; i++) {
            for (let j = 0; j < this.allRoutesVaciaTracks[i].length; j++) {
                //const index = Math.round(this.allRoutesVaciaTracks[i][j].length / 2) - 1;
                const index = 0;

                const json = {
                    lat: this.allRoutesVaciaTracks[i][j][index].lat,
                    lng: this.allRoutesVaciaTracks[i][j][index].lng,
                    origin: this.allRoutesVaciaTracks[i][j][index].origin,
                    destiny: this.allRoutesVaciaTracks[i][j][index].destiny,
                    borough: this.allRoutesVaciaInfo[i].Borough,
                    name: this.allRoutesVaciaInfo[i].Name,
                    label: this.allRoutesVaciaInfo[i].label
                }

                this.markersVaciaTracks.push(json);
            }
        }

    }

    setRadioFlujo() {
        if (this.flujo === 'vacia') {
            this.showRoutesGreen = true;
        } else {
            this.showRoutesGreen = false;
        }
    }

    setRadioMarkersFlujo() {
        if (this.hideMarkersFlujo === 'show') {
            this.showMarkersFlujo = true;
        } else {
            this.showMarkersFlujo = false;
        }
    }



}

