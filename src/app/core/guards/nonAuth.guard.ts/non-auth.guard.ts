import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router, UrlTree } from '@angular/router';
import { LoginService } from '../../services/login/login.service';

export const nonAuthenticatedMatchGuard: CanActivateFn = (
  route,
  segments
): boolean | UrlTree => {
  const router = inject(Router);
  const loginService = inject(LoginService);

  return !loginService.isAuthenticated() || router.createUrlTree(['/']);

  // return true;
};
