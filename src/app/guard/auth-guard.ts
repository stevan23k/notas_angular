import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth/auth-service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs';
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAuth().pipe(
    map((resp) => {
      if (resp.body?.isAuth) {
        return true;
      }
      alert('no autenticado');
      return router.createUrlTree(['/login']);
    }),
    catchError(() => router.navigate(['/login'])),
  );
};
