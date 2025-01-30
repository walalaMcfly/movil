import { Component, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.page.html',
  styleUrls: ['./viajes.page.scss'],
  standalone: false,
})
export class ViajesPage implements AfterViewInit {
  viajes: any[] = [];

  constructor(private http: HttpClient) {}

  ngAfterViewInit() {
    this.obtenerViajes();
  }

  obtenerViajes() {
    this.http.get<any[]>('http://localhost:3000/viajes').subscribe((data) => {
      this.viajes = data;
      this.mostrarMapas();
    });
  }

  mostrarMapas() {
    (mapboxgl as any).accessToken = 'pk.eyJ1Ijoid2FsYWxhbWNmbHkiLCJhIjoiY202ZmxuMTJxMDZuajJub3RxYnRlbG5xcyJ9.x_6pVMkpvuVuTqlTn_2Fdg';

    this.viajes.forEach((viaje) => {
      setTimeout(() => {
        const map = new mapboxgl.Map({
          container: `map-${viaje.id}`,
          style: 'mapbox://styles/mapbox/streets-v11',
          center: viaje.ruta[0], // Centrar en el primer punto de la ruta
          zoom: 10,
        });

        map.on('load', () => {
          map.addLayer({
            id: `route-${viaje.id}`,
            type: 'line',
            source: {
              type: 'geojson',
              data: {
                type: 'Feature',
                properties: {},
                geometry: {
                  type: 'LineString',
                  coordinates: viaje.ruta,
                },
              },
            },
            layout: { 'line-join': 'round', 'line-cap': 'round' },
            paint: { 'line-color': '#ff0000', 'line-width': 5 },
          });
        });
      }, 500);
    });
  }

  tomarViaje(viaje: any) {
    if (viaje.capacidad > 0) {
      viaje.capacidad -= 1;

      this.http.put(`http://localhost:3000/viajes/${viaje.id}`, viaje).subscribe(() => {
        alert('Has tomado el viaje exitosamente');
        this.obtenerViajes();
      });
    } else {
      alert('No hay cupos disponibles para este viaje');
    }
  }
}
