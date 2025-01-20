import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular/standalone';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: false,
  
})
export class RegistroPage implements OnInit {

  constructor(private toastController: ToastController) { }
  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Felicidades se a Registrado Exitosamente 😊',
      duration: 1500,
      position: position,
    });

    await toast.present();
  }

  ngOnInit() {
  }

}
