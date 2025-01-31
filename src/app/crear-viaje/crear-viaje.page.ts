import { Component, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as mapboxgl from 'mapbox-gl';
import { AlertController } from '@ionic/angular';

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

  constructor(private http: HttpClient, private alertController: AlertController) {}

  ngAfterViewInit() {
    (mapboxgl as any).accessToken = 'pk.eyJ1Ijoid2FsYWxhbWNmbHkiLCJhIjoiY202ZmxuMTJxMDZuajJub3RxYnRlbG5xcyJ9.x_6pVMkpvuVuTqlTn_2Fdg';
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-70.6483, -33.4569],
      zoom: 10,
    });
    
    this.map.on('click', (event) => {
      const coords = [event.lngLat.lng, event.lngLat.lat];
      if (!this.origen) {
        this.origen = `${coords[1]}, ${coords[0]}`;
        this.obtenerDireccion(coords, 'origen');
        this.agregarMarcador(coords, 'origen');
      } else {
        this.destino = `${coords[1]}, ${coords[0]}`;
        this.obtenerDireccion(coords, 'destino');
        this.agregarMarcador(coords, 'destino');
        this.obtenerRuta();
      }
    });
  }

  // Función para obtener la dirección a partir de coordenadas
  obtenerDireccion(coordinates: number[], tipo: string) {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${coordinates[0]},${coordinates[1]}.json?access_token=${(mapboxgl as any).accessToken}`;
    this.http.get<any>(url).subscribe((response) => {
      const nombreUbicacion = response.features[0]?.place_name || 'Ubicación desconocida';
    
      if (tipo === 'origen') {
        this.origen = nombreUbicacion;
      } else {
        this.destino = nombreUbicacion;
      }
    });
  }

  
  agregarMarcador(coordinates: number[], tipo: string) {
    const marcador = new mapboxgl.Marker({
      color: tipo === 'origen' ? 'green' : 'red',  
      scale: 1.5,  
    })
    .setLngLat([coordinates[0], coordinates[1]]) 
  }

  obtenerRuta() {
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${this.origen};${this.destino}?geometries=geojson&access_token=${(mapboxgl as any).accessToken}`;

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
        paint: {
          'line-color': '#ff7f50',  
          'line-width': 6,           
          'line-dasharray': [2, 4],  
        },
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
      this.mostrarAlerta('Viaje creado', 'Espera a que un pasajero tome su viaje');
    });
  }

  async mostrarAlerta(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
