import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PopUpService } from '../services/pop-up.service';
import { DataApiService } from './data-api.service';

import * as L from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {
  capitals: string = '/assets/data/usa-capitals.geojson';

  constructor(private http: HttpClient,
    private popupService: PopUpService,
    private dataApiService: DataApiService) { }

  makeDenuesMarkers(map: L.Map, idestado: string, idmunicipio: string, actividad: string): void {
    console.log('asui tmb!', idestado, idmunicipio, actividad);
    
    this.dataApiService.getDenues(idestado, idmunicipio, actividad).subscribe((res: any) => {
      console.log('RES!', res);
      
      for (const c of res) {
        console.log(c);
        
        const lat = parseFloat(c.latitud);
        const lon = parseFloat(c.longitd);
        // const marker2 = L.marker()
        const marker = L.marker([lat, lon],
          {
            icon: L.icon({
              iconSize: [25, 41],
              iconAnchor: [13, 41],
              iconUrl: 'assets/1.png',
            })
          });
          console.log(marker);
          

        marker.bindPopup(this.popupService.makeDenuesPopup(c));
        marker.addTo(map);

        //.addTo(map);
      }
    });

  }

  makeCapitalMarkers(map: L.Map): void {

    this.http.get(this.capitals).subscribe((res: any) => {
      for (const c of res.features) {
        const lat = c.geometry.coordinates[0];
        const lon = c.geometry.coordinates[1];
        const marker = L.marker([lon, lat]);

        marker.bindPopup(this.popupService.makeCapitalPopup(c.properties));
        marker.addTo(map);

        //.addTo(map);
      }
    });

  }
}
