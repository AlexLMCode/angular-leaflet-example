import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { MarkerService } from '../services/marker.service';
import { DataApiService } from '../services/data-api.service';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements AfterViewInit {
  static initMap() {
    throw new Error('Method not implemented.');
  }
  private map: any;

  zoom = 12;
  lat = 19.451054;
  lng = -99.125519;

  selectedEstado = '';
  selectedMunicipio = '';
  selectedUnidad = '';

  arrEstados = [];
  arrMunicipios = [];
  arrActividades = [];

  constructor(private markerService: MarkerService,
    private dataApiService: DataApiService
  ) { }

  ngAfterViewInit(): void {
    this.initMap();
    this.markerService.makeCapitalMarkers(this.map);
    this.getEstados();
    this.getUnidades();
  }

  public initMap(): void {
    this.map = L.map('map', {
      center: [this.lat, this.lng],
      zoom: this.zoom
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  public getEstados() {
    alert('get estados');
    this.dataApiService.getEstados().subscribe((estados: any) => {
      this.arrEstados = estados;
      alert(this.arrEstados);
    });

  }

  public getUnidades() {
    this.dataApiService.getUnidades().subscribe((unidades: any) => {
      this.arrActividades = unidades;
    });

  }

  public changeEstado() {
    this.dataApiService.getMunicipios(this.selectedEstado)
      .subscribe((municipios: any) => {
        this.arrMunicipios = municipios;
        console.log(municipios);

      });

  }

  public changeUnidad() {
    // console.log(this.arrActividades);
    // console.log(this.selectedUnidad);



    // this.dataApiService.getUnidades().subscribe((empresas: any)=>{
    //   empresas.forEach(actividad => {

    //   });

    //   this.selectedUnidad = empresas.tipo;
    //   console.log('HOLA PUTO', this.selectedUnidad);

    // })
  }

  public clearDenues() {
    // console.log('MAP!', this.map);
    this.map.eachLayer(layer => {
      console.log(layer);
      layer.remove()

    })

    // this.markerService.
  }


  public buscarDenues() {

    console.log('AQUII!', this.selectedUnidad, this.selectedEstado, this.selectedMunicipio);
    // this.clearDenues();

    this.markerService.makeDenuesMarkers(this.map,
      this.selectedEstado,
      this.selectedMunicipio,
      this.selectedUnidad
    );




  }


}