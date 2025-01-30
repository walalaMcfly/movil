import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ViajeService {

  private apiUrl = 'http://localhost:3000/viajes';

  private viajes: any[] = []; // Lista de viajes almacenados
  constructor(private http: HttpClient) {}

  
  obtenerViajes() {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Guardar un nuevo viaje
  crearViaje(viaje: any) {
    return this.http.post(this.apiUrl, viaje);
  }
  }

 

