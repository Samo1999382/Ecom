import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  let _Auth: AuthService = inject(AuthService);
  let router: Router = inject(Router);
  if (_Auth.userToken && _Auth.userToken.value !== null) {
    return true;
  }
  router.navigate(['/login']);
  return false;
};
