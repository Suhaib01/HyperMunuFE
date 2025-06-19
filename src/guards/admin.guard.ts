import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = localStorage.getItem('token');
  if (!token) {
    router.navigate(['Auth/login']);
    return false;
  }

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const role = payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    console.log(role);
    if (role === 'Admin') {
      return true;
    } else {
      router.navigate(['Auth/login']);
      return false;
    }
  } catch (error) {
    console.error('Token decode error:', error);
    router.navigate(['Auth/login']);
    return false;
  }
};
