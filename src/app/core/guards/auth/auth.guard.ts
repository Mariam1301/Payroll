import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { LoginService } from '../../services/login/login.service';

export const authMatchGuard: CanActivateFn = (
  route,
  segments
): boolean | UrlTree => {
  const router = inject(Router);
  const loginService = inject(LoginService);

  return loginService.isAuthenticated() || router.createUrlTree(['/auth']);
};
