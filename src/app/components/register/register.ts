import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth-service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [RouterModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  formError: boolean = false;
  errorMessage: string = '';
  aceptarTerminos = new FormControl(false);

  registerForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  register() {
    const user = {
      username: this.registerForm.value.username!,
      password: this.registerForm.value.password!,
    };
    this.auth.register(user).subscribe({
      next: (response) => {
        if (response.status === 201) {
          console.log('regitro exitoso');
          this.registerForm.reset();
          this.router.navigate(['/login']);
        }
      },
      error: (error: HttpErrorResponse) => {
        console.log('registro fallido -- error', error);
        this.registerForm.reset();
        this.formError = true;
        this.errorMessage = error.error.message || 'Registration failed. Please try again.';
        console.log(user);
      },
    });
  }
}
