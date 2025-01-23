import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';
import { AuthService } from '../Servicios/auth.service';
import { Geolocation } from '@capacitor/geolocation'
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
 
  user = {
    usuario: '',
    password: '',
  };

  msj = '';

  carga = false;
  
  constructor(
    private router: Router, 
    private animation: AnimationController,
    private auth: AuthService,
    private geo: Geolocation
  ) {}

    conectar() {
      if (this.user.usuario.length > 0 && this.user.password.length > 0) {
        this.auth.loginAPI(this.user.usuario, this.user.password).then((res) => {
          if (res) {
            let navigationExtras: NavigationExtras = {
              state: { user: this.user },
            };
            this.carga = true;
            this.animacionLogin().play();
            this.msj = 'Conexion Exitosa';
            /* setTimeout permite generar un delay en MS */
            setTimeout(() => {
              this.router.navigate(['/perfil'], navigationExtras);
              this.msj = '';
              this.carga = false;
            }, 3000);
          } else {
            this.msj = 'Credenciales erroneas';
          }
        });
      } else {
        this.msj = 'Credenciales no pueden estar vacias';
      }
    }

  ngAfterContentInit() {
    Geolocation.getCurrentPosition().then((posicion) => {
      console.log('Latitud:'+ posicion.coords.latitude);
      console.log('Longitud: '+ posicion.coords.longitude);
    });
       
  }
 
  animacionLogin(){
    const imagen = document.querySelector(
      '#container ion-card ion-card-header ion-img'
    )as HTMLLabelElement;
    const animacion = this.animation.create()
    .addElement(imagen)
    .duration(3000)
    .iterations(Infinity)
    .keyframes([
      {
        offset: 0,
        transform: 'scale(1)', 
      },
      {
        offset: 0.25,
        transform: 'scale(1.2)', 
      },
      {
        offset: 0.5,
        transform: 'scale(1)', 
      },
      {
        offset: 0.75,
        transform: 'scale(0.8)', 
      },
      {
        offset: 1,
        transform: 'scale(1)',
      },
    ]);
    return animacion;

  }

} 
