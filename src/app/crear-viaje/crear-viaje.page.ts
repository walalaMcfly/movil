import { Component, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-crear-viaje',
  templateUrl: './crear-viaje.page.html',
  styleUrls: ['./crear-viaje.page.scss'],
  standalone: false,
})
export class CrearViajePage implements AfterViewInit {
  map!: mapboxgl.Map;
  origen: string = '';
  destino: string = '';
  costo!: number;
  capacidad!: number;
  rutaCoordenadas: any[] = [];

  constructor(private http: HttpClient) {}

  ngAfterViewInit() {
    (mapboxgl as any).accessToken = 'pk.eyJ1Ijoid2FsYWxhbWNmbHkiLCJhIjoiY202ZmxuMTJxMDZuajJub3RxYnRlbG5xcyJ9.x_6pVMkpvuVuTqlTn_2Fdg';
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-70.6483, -33.4569], // Coordenadas iniciales (ejemplo Santiago)
      zoom: 10,
    });

    this.map.on('click', (event) => {
      const coords = [event.lngLat.lng, event.lngLat.lat];
      if (!this.origen) {
        this.origen = `${coords[1]}, ${coords[0]}`;
      } else {
        this.destino = `${coords[1]}, ${coords[0]}`;
        this.obtenerRuta();
      }
    });
  }

  obtenerRuta() {
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${this.origen};${this.destino}?geometries=geojson&access_token=TU_MAPBOX_ACCESS_TOKEN`;
    
    this.http.get<any>(url).subscribe((res) => {
      this.rutaCoordenadas = res.routes[0].geometry.coordinates;

      this.map.addLayer({
        id: 'route',
        type: 'line',
        source: {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: this.rutaCoordenadas,
            },
          },
        },
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        paint: { 'line-color': '#ff0000', 'line-width': 5 },
      });
    });
  }

  crearViaje() {
    const nuevoViaje = {
      origen: this.origen,
      destino: this.destino,
      costo: this.costo,
      capacidad: this.capacidad,
      ruta: this.rutaCoordenadas,
    };

    this.http.post('http://localhost:3000/viajes', nuevoViaje).subscribe(() => {
      alert('Viaje creado exitosamente');
    });
  }
}
