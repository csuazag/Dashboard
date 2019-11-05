import { Component, OnInit } from '@angular/core';
import { MapService } from '../services/map.service';

interface Marker {
    Borough: string,
    Name: string,
    label: string,
    latitude: string,
    longitude: string,
    color: any
}

@Component({
    selector: 'app-maps',
    templateUrl: './maps.component.html',
    styleUrls: ['./maps.component.css']
})

export class MapsComponent implements OnInit {

    showGreen = true;
    showMarkers = true;
    

    hideMarkers = 'show';
    zona = 'segura';

    allMarkersGreen: Marker[] = [];
    allMarkersRed: Marker[] = [];
    allMarkers: Marker[] = [];

    lat = 40.7142715;
    lng = -74.0059662;

    constructor(private mapService: MapService) {

        this.mapService.getZonas().subscribe(data => {

            for (let i = 0; i < data['data'].length; i++) {
                const label = data['data'][i]['label'];

                if (label == 'Segura') {
                    this.allMarkersGreen.push(data['data'][i]);

                } else if (label == 'Peligrosa') {
                    this.allMarkersRed.push(data['data'][i]);

                } else {
                    this.allMarkersRed.push(data['data'][i]);
                }
            }
            this.allMarkers = data['data'];
        });

    }

    ngOnInit() {

    }

    setRadioZona() {
        if (this.zona == 'segura') {
            this.showGreen = true;
        } else {
            this.showGreen = false;
        }
    }

    setRadioMarkers(){
        if(this.hideMarkers == 'show'){
            this.showMarkers = true;
        }else{
            this.showMarkers = false;
        }
    }




}
