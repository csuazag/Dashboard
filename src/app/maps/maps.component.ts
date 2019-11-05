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

    allMarkers: Marker[] = [];

    lat = 40.7142715;
    lng = -74.0059662;

    zona  = 'segura';



    constructor(private mapService: MapService) {
        /**
        this.mapService.getZonas().subscribe(data => {

            for (let i = 0; i < data['data'].length; i++) {
                const label = data['data'][i]['label'];
                console.log(label);

                let color: string = '';
                if (label == 'Segura') {
                    color = "\'green\'";
                } else if (label == 'Peligrosa') {
                    color = "\'red\'";
                } else {
                    color = "\'gray\'";
                }
                console.log(color);
                data['data'][i]['color'] = color;
            }
            this.allMarkers = data['data'];
            console.log(this.allMarkers);
        

        });
         */
    }

    ngOnInit() {

    }

  


}
