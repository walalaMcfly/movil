import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.page.html',
  styleUrls: ['./viajes.page.scss'],
  standalone: false,
})
export class ViajesPage implements OnInit {
  startPoint: mapboxgl.LngLat | null = null;
  endPoint: mapboxgl.LngLat | null = null;

  mapa!: mapboxgl.Map;

  role: string = '';

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    (mapboxgl as any).accessToken = 'pk.eyJ1Ijoid2FsYWxhbWNmbHkiLCJhIjoiY202ZmxuMTJxMDZuajJub3RxYnRlbG5xcyJ9.x_6pVMkpvuVuTqlTn_2Fdg'; 

    this.mapa = new mapboxgl.Map({
      container: 'map', // ID del contenedor en el HTML
      style: 'mapbox://styles/mapbox/streets-v11', // Estilo del mapa
      center: [-70.64722270612857, -33.44813131279552], // Coordenadas iniciales [longitud, latitud]
      zoom: 9, // Nivel de zoom inicial
    });

    this.mapa.addControl(new mapboxgl.NavigationControl()); // Controles de zoom

    this.mapa.on('click', (event: mapboxgl.MapMouseEvent) => {
      const coordinates = event.lngLat;
      console.log('Punto seleccionado:', coordinates);
    });


  
  }

  ngAfterViewInit() {
    this.mapa.on('click', (event: mapboxgl.MapMouseEvent) => {
      const coordinates = event.lngLat;
  
      if (!this.startPoint) {
        this.startPoint = coordinates;
        new mapboxgl.Marker({ color: 'green' })
          .setLngLat(coordinates)
          .addTo(this.mapa);
        console.log('Origen:', coordinates);
      } else if (!this.endPoint) {
        this.endPoint = coordinates;
        new mapboxgl.Marker({ color: 'red' })
          .setLngLat(coordinates)
          .addTo(this.mapa);
        console.log('Destino:', coordinates);
        this.generateRoute(); // Generar ruta cuando ambos puntos están seleccionados
      }
    });
  }
  
  // Función para generar ruta
  generateRoute() {
    if (!this.startPoint || !this.endPoint) return;
  
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${this.startPoint.lng},${this.startPoint.lat};${this.endPoint.lng},${this.endPoint.lat}?geometries=geojson&access_token=TU_MAPBOX_ACCESS_TOKEN`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const route = data.routes[0].geometry.coordinates;
        this.mapa.addLayer({
          id: 'route',
          type: 'line',
          source: {
            type: 'geojson',
            data: {
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'LineString',
                coordinates: route,
              },
            },
          },
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': '#3887be',
            'line-width': 5,
          },
        });
      })
      .catch(err => console.error('Error al generar la ruta:', err));
  }

}


