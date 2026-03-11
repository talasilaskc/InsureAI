import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth';

export const guestGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if(!authService.isloggedIn()){
    return true;
  }

  const role = authService.getUserRole();

  if(role==="ROLE_ADMIN"){
    return router.parseUrl('/admin/dashboard');
  }
  else if(role==="ROLE_COMPANY"){
    return router.parseUrl('/company/dashboard');
  }
  return router.parseUrl('/');
};
