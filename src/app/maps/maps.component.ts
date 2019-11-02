import { Component, OnInit } from '@angular/core';
import { MapService } from '../services/map.service';


interface Marker {
    latitude: number;
    longitude: number;
    borough: string;
    neighborhood: string;
    type: string
}


@Component({
    selector: 'app-maps',
    templateUrl: './maps.component.html',
    styleUrls: ['./maps.component.css']
})

export class MapsComponent implements OnInit {

    allMarkers: Marker[] = [
        {
            latitude: 40.7142715,
            longitude: -74.0059662,
            borough: 'Manhattan',
            neighborhood: 'St1',
            type: 'Danger'
        }
    ];
    lat = 40.7142715;
    lng = -74.0059662;

    
    constructor(private mapService: MapService) {
        //this.mapService.getZonas().subscribe( data => {
        //    this.allMarkers = data.data;
        //});
    }

    ngOnInit() {

    }

}
