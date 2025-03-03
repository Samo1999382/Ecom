import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { inject } from '@angular/core';

export const checkTokenGuard: CanActivateFn = (route, state) => {
  let _Auth: AuthService = inject(AuthService);
    let router: Router = inject(Router);
    if (_Auth.userToken && _Auth.userToken.value == null) {
      return true;
    }
    router.navigate(['/home']);
    return false;
};
