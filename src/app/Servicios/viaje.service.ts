import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Suponiendo que usarás un backend
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ViajeService {

  private viajes: any[] = []; // Lista de viajes almacenados
  private viajesSubject: BehaviorSubject<any[]> = new BehaviorSubject(this.viajes);

  constructor(private http: HttpClient) {}

  crearViaje(viaje: any) {
    // Aquí deberías enviar los datos al servidor para guardarlos en una base de datos
    return new Promise((resolve, reject) => {
      this.viajes.push(viaje);
      this.viajesSubject.next(this.viajes);
      resolve(true);
    });
  }

  obtenerViajes() {
    // Aquí puedes obtener los viajes desde un servidor o retornar los viajes locales
    return this.viajesSubject.asObservable();
  }
}
