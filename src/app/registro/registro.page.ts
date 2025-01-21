import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular/standalone';
import { AuthService } from '../Servicios/auth.service';
import { NavigationExtras, Router } from '@angular/router';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: false,
  
})
export class RegistroPage implements OnInit {

  constructor(private toastController: ToastController, private router: Router,private auth: AuthService) { }
  
  user = {
    usuario: '',
    correo: '',
    password: '',
  };

  registrar() {
    //Verificamos que los campos tengan valor
    if (
      this.user.usuario.trim().length > 0 ||
      this.user.password.trim().length > 0 ||
      this.user.correo.trim().length > 0
    ) {
      //Verificar si el registro se realizo
      if (
        this.auth.registrar(
          this.user.usuario,
          this.user.correo,
          this.user.password
        )
      ) {
        this.generarToast('Registro Exitoso \n Redireccionando');
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 1500);
      } else {
        this.generarToast('Correo o usuario ya existen');
      }
    } else {
      this.generarToast('Credenciales no pueden estar vacias');
    }
  }
  
  generarToast(mensaje: string) {
    const toast = this.toastController.create({
      message: mensaje,
      duration: 3000,
      position: 'bottom',
    });
    toast.then((res) => {
      res.present();
    });
  }
    
  

  ngOnInit() {
  }

}
