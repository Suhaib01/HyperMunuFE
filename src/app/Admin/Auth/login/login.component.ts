import {jwtDecode} from 'jwt-decode';

interface JwtPayload {
  role?: string | string[];
  roles?: string[];
  [key: string]: any;
}

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

        const decoded = jwtDecode(res.token) as JwtPayload;

        let roles: string[] = [];

        if (decoded.role) {
          roles = Array.isArray(decoded.role) ? decoded.role : [decoded.role];
        } else if (decoded.roles) {
          roles = decoded.roles;
        }

        else if (decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']) {
          const claimRole = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
          roles = Array.isArray(claimRole) ? claimRole : [claimRole];
        }

        if (roles.includes('SuperAdmin')) {
          this.router.navigate(['Admin/dashboard']);
        } else if (roles.includes('Admin')) {
          this.router.navigate(['Home/dashboard']);
        } else {
          this.router.navigate(['/']);
        }
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
