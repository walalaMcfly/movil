import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';
import { AuthService } from '../Servicios/auth.service';

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
  selectedRole: string = ''; 
  carga = false;
  
  constructor(
    private router: Router, 
    private animation: AnimationController,
    private auth: AuthService,
  ) {}

  conectar() {
    if (this.user.usuario.length > 0 && this.user.password.length > 0) {
      if (!this.selectedRole) {
        this.msj = 'Por favor selecciona un rol';
        return;
      }
  
      this.auth.loginAPI(this.user.usuario, this.user.password).then((res) => {
        if (res) {
          let navigationExtras: NavigationExtras = {
            state: { user: this.user, role: this.selectedRole }, 
          };
          this.carga = true;
          this.animacionLogin().play();
          this.msj = 'Conexión Exitosa';
  
          setTimeout(() => {
            if (this.selectedRole === 'pasajero') {
              this.router.navigate(['/perfil'], navigationExtras);
            } else if (this.selectedRole === 'dueno') {
              this.router.navigate(['/crear-viaje'], navigationExtras);
            }
  
            this.msj = '';
            this.carga = false;
          }, 3000);
        } else {
          this.msj = 'Credenciales erróneas';
        }
      });
    } else {
      this.msj = 'Credenciales no pueden estar vacías';
    }
  }
  

  ngAfterContentInit() {
   
       
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
