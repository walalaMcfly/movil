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
      try {
        const usuario = await this.authService.recuperarContraseña(this.username);
        if (usuario) {
          this.generarToast('Contraseña recuperada 🗿💖');
          this.mostrarContraseñaEnAlert(usuario.pass); 
          this.router.navigate(['/home'])
        } else {
          this.generarToast('Usuario no encontrado 😔');
        }
      } catch (error) {
        console.error('Error en la recuperación de contraseña:', error);
        this.generarToast('Ocurrió un error al recuperar la contraseña 😔');
      }
    } else {
      this.generarToast('Por favor, ingresa un nombre de usuario 😅');
    }
  }
  
  async mostrarContraseñaEnAlert(password: string) {
    const alert = await this.alertController.create({
      header: 'Te he traído tu contraseña ╰(*°▽°*)╯',
      message: `Esta es tu contraseña 🧐: ${password}`,
      buttons: ['YAPII 💖🐉'],
    });
    await alert.present();
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


