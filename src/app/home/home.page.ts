import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';
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
  constructor(private router: Router, private animation: AnimationController) {}

  conectar() {
    if (this.user.usuario.length > 0 && this.user.password.length > 0) {
      if(
        this.user.usuario =='j.riquelmee' && 
        this.user.password =='pass1234'
      ) {
        

      }

      let navigationExtras: NavigationExtras = {
        state: { user: this.user },
      };
      this.carga = true;
      this.msj = 'Carga Exitosa'
      setTimeout(() => {
        this.router.navigate(['/perfil'], navigationExtras);
        this.msj ='';
        this.carga = false;
        }, 3000);

    } else {
      this.msj = 'Credenciales no pueden estar vacias';
    }
  }
 
  animacionLogin(){
    const imagen = document.querySelector(
      '#container ion-card ion-card-header ion-img'
    )as HTMLLabelElement;
    const animacion = this.animation.create()
    .addElement(imagen)
    .duration(3000)
    .iterations(Infinity)
    .fromTo('opacity','1','0.2')
    .fromTo("border",'2px solid white','25px spolid red');

    animacion.play()

  }

} 
