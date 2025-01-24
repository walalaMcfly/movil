import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Servicios/auth.service';
import { ToastController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-recuperar-pass',
  templateUrl: './recuperar-pass.page.html',
  styleUrls: ['./recuperar-pass.page.scss'],
  standalone: false,
})
export class RecuperarPassPage implements OnInit {

  username: string='';

  constructor(private authService: 
    AuthService, 
    private toastController: 
    ToastController,
    private router: Router,
    private alertController: AlertController) { }

  ngOnInit() {
  }

  async recuperarContrasena() {
    if (this.username.trim().length > 0) {
      const result = await this.authService.recuperarContraseña(this.username);
      if (result) {
        this.generarToast('Contraseña recuperada 🗿💖');
        this.mostrarContraseñaEnAlert(this.username);
        this.router.navigate(['/home']);
      } else {
        this.generarToast('Usuario no encontrado');
      }
    } else {
      this.generarToast('ingrese un usuario valido');
    }
  }

  async mostrarContraseñaEnAlert(username: string) {
    const usuario = await this.authService.getUsuarioPorUsername(username);

    if (usuario) {
      const alert = await this.alertController.create({
        header: 'Te he traido tu contraseña ╰(*°▽°*)╯',
        message: `Esta es tu contraseña 🧐: ${usuario.pass}`,
        buttons: ['YAPII 💖🐉'],
      });
      await alert.present();
    }
  }

  generarToast(mensaje: string) {
    const toast = this.toastController.create({
      message: mensaje,
      duration: 5000,
      position: 'bottom',
    });
    toast.then((res) => res.present());
  }
}


