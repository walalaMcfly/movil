import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { ApiService } from './api.service';
import { firstValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private static isLogged: boolean = false;
  private storage:LocalStorageService = new LocalStorageService();
  private api: ApiService  = new ApiService();
  constructor() {}

  /*login(user: string, pass: string): boolean {

  
    if (
      (user == 'sos' || user == 'jo.riquelmee@duocuc.cl') &&
      pass == 'pass1234'
    ) {
      AuthService.isLogged = true;
      return true;
    } else {
      return false;
    }
  }
    */

  loginStorage(user: String, pass: String):boolean {
    const listaUsuarios= this.storage.getItem('users') || [];
    
    const conectado = listaUsuarios.find((userFind:any) => (userFind.username==user || userFind.correo==user) &&
    userFind.pass == pass 
    );

    if(conectado){

      this.storage.setItem('conectado', conectado);
      return true;
    } else {
      return false;
    }


  }

  registrar(user: string, correo: string, pass: string) {
    const listaUsuarios = this.storage.getItem('users') || [];
    if (
      listaUsuarios.find(
        (userFind: any) =>
          userFind.username == user || userFind.correo == correo
      )
    ) {
      return false;
    }
    const nuevoUsuario = {
      id: listaUsuarios.length + 1,
      username: user,
      correo: correo,
      pass: pass,
    };
  
    listaUsuarios.push(nuevoUsuario);
    this.storage.setItem('users', listaUsuarios);
    return true;
  }
  async registerAPI(user: string, correo: string, pass: string): Promise<boolean> {
    const users = await firstValueFrom(this.api.listarUsuarios()); 
  
    const exists = users.find((us: any) => us.username === user || us.correo === correo) != null;
    if (exists) {
      return false; 
    }
    const nuevoUsuario = {
      username: user,
      correo: correo,
      pass: pass,
    };

    await this.api.register(nuevoUsuario).subscribe((response) => {
      console.log('Usuario registrado:', response);
    });
  
    return true;
  }
  

  isConnected(): boolean {
    return this.storage.getItem('conectado') !== null;


  }

  logout() {
    this.storage.removeItem('conectado');
  }

  loginAPI(user: string, pass: string): Promise<boolean> {
    return new Promise((resolve) => {
      this.api.login(user).subscribe((res: any) => {
        if (res.length > 0) {
          if (
            (res[0].username == user || res[0].correo == user) &&
            res[0].pass == pass
          ) {
            this.storage.setItem('conectado', JSON.stringify(res[0]));
            resolve(true);
          } else {
            resolve(false);
            console.log('Credenciales no validas');
          }
        } else {
          console.log('Llamada vacia');
        }
      });
    });
  }

  recuperarContraseña(username: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.api.listarUsuarios().subscribe({
        next: (usuarios: any[]) => {
          const usuario = usuarios.find((user: any) => user.username === username);
          if (usuario) {
            resolve(usuario);
          } else {
            resolve(null);
          }
        },
        error: (error) => {
          console.error('Error al recuperar usuarios desde el API:', error);
          reject(error);
        },
      });
    });
  }
  
  async getUsuarioPorUsername(username: string): Promise<any> {
    try {
      const usuarios = await firstValueFrom(this.api.listarUsuarios());
      return usuarios.find((user: any) => user.username === username) || null;
    } catch (error) {
      console.error('Error al obtener usuario por username:', error);
      return null;
    }
  }
  
  
   
}