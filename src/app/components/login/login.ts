import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth-service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}
  failLogin: boolean = false;

  form = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  sendLogin() {
    const user = {
      username: this.form.value.username!,
      password: this.form.value.password!,
    };
    this.auth.login(user).subscribe({
      next: (response) => {
        if (response.status === 200) {
          console.log('Login successful');
          this.failLogin = false;
          console.log(response.body);
          this.router.navigate(['/']);
        }
      },
      error: (error: HttpErrorResponse) => {
        console.log('login fallido - error:', error.status);
        this.form.reset({ username: this.form.value.username, password: '' });
        this.failLogin = true;
        console.log(this.form.value);
      },
    });
  }
}
