import { Component, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as mapboxgl from 'mapbox-gl';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.page.html',
  styleUrls: ['./viajes.page.scss'],
  standalone: false,
})
export class ViajesPage implements AfterViewInit {
  viajes: any[] = [];

  constructor(private http: HttpClient, private alertController: AlertController) {}

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
          center: viaje.ruta[0], 
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
        this.mostrarAlerta('Viaje tomado', 'Disfuta tu viaje 😉🚘');
        this.obtenerViajes();
      });
    } else {
      this.mostrarAlerta('Sin disponibilidad', 'No hay cupos disponibles para este viaje');
    }
  }

  async mostrarAlerta(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Usuario canceló');
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            console.log('Usuario aceptó');
          }
        }
      ]
    });
  
    await alert.present();
  }
  
}
