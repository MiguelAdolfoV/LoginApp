import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  username: string = '';
  password: string = '';
  isValid: boolean = false;

  constructor(private alertCtrl: AlertController) {}

  validateInputs(inputType: string) {
    if (inputType === 'username') {
      this.username = this.username.replace(/\s/g, '').toLowerCase(); 
    } else if (inputType === 'password') {
      this.password = this.password.replace(/\s/g, '');
    }

    this.isValid = this.username.length > 0 && this.password.length > 0;
  }

  async showModal() {
    const alert = await this.alertCtrl.create({
      header: 'Información',
      message: '',
      buttons: ['Cerrar']
    });
  
    alert.message = `Username: ${this.username}
                     Password:${this.password}`;
  
    await alert.present();
  }
  
}
