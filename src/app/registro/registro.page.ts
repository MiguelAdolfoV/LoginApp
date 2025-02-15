  import { Component } from '@angular/core';
  import { FormBuilder, FormGroup, Validators } from '@angular/forms';
  import { ToastController } from '@ionic/angular';

  @Component({
    selector: 'app-registro',
    templateUrl: './registro.page.html',
    styleUrls: ['./registro.page.scss'],
    standalone: false,
  })
  export class RegistroPage {
    registroForm: FormGroup;
    passwordsMatch: boolean = true;
    usuarios: any[] = []; 

    constructor(private fb: FormBuilder, private toastController: ToastController) {
      this.registroForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        fullName: ['', [Validators.required]],
        username: ['', [Validators.required, Validators.pattern(/^\S*$/)]],
        password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^\S*$/)]],
        confirmPassword: ['', [Validators.required]],
        birthDate: ['', [Validators.required]],
      });
    }

    validateInputs(field: string) {
      if (field === 'fullName') {
        const fullName = this.registroForm.get('fullName')?.value;
        if (fullName && fullName !== fullName.toUpperCase()) {
          this.registroForm.patchValue({ fullName: fullName.toUpperCase() });
        }
      } else {
        const value = this.registroForm.get(field)?.value;
        if (value && /\s/g.test(value)) {
          this.registroForm.patchValue({ [field]: value.replace(/\s/g, '') });
        }
      }

      const password = this.registroForm.get('password')?.value;
      const confirmPassword = this.registroForm.get('confirmPassword')?.value;
      this.passwordsMatch = password === confirmPassword;
    }

    async submitForm() {
      if (this.registroForm.valid && this.passwordsMatch) {
        const usuario = this.registroForm.value;
        this.usuarios.push(usuario);
        console.log('Registro exitoso:', usuario);
        console.log('Usuarios registrados:', this.usuarios);
        
        await this.presentToast();

        this.registroForm.reset();
      }
    }

    async presentToast() {
      const toast = await this.toastController.create({
        message: `Usuarios registrados: ${JSON.stringify(this.usuarios)}`,
        duration: 3000,
        position: 'bottom'
      });
      await toast.present();
    }
  }
