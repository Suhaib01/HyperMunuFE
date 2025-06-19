import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  isLoading: boolean = false;
  loginError: string = '';
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onLogin(): void {
    if (this.loginForm.invalid) return;

    this.isLoading = true;
    this.loginError = '';
    const loginData = this.loginForm.value;

    this.authService.login(loginData).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.successMessage = 'Logged in successfully!';
        this.loginForm.reset();
        localStorage.setItem('token', res.token); 
        console.log(res.token);
        this.router.navigate(['Home/dashboard']);
      },
      error: (err) => {
        this.isLoading = false;
        this.loginError =
          err?.error?.errors?.map((e: any) => e.Errors).flat().join(', ') ||
          err?.error?.error ||
          'Login failed.';
      },
    });
  }
}
