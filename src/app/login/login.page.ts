import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage {
  loginForm: FormGroup;
  loginFailed: boolean = false;

  constructor(private fb: FormBuilder, private toastController: ToastController, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^\S*$/)]],
    });
  }

  validateInputs(field: string) {
    if (field === 'email') {
      const email = this.loginForm.get('email')?.value;
      if (email && email !== email.toLowerCase()) {
        this.loginForm.patchValue({ email: email.toLowerCase() });
      }
    } else if (field === 'password') {
      const password = this.loginForm.get('password')?.value;
      if (password && /\s/g.test(password)) {
        this.loginForm.patchValue({ password: password.replace(/\s/g, '') });
      }
    }
  }

  async submitForm() {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const usuario = usuarios.find((u: { email: string; password: string }) => u.email === email && u.password === password);

    if (usuario) {
      this.loginFailed = false;
      this.router.navigate(['/home']);
    } else {
      this.loginFailed = true;
      this.presentToast('Correo o contraseña incorrectos');
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    });
    await toast.present();
  }
}
