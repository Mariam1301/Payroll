import { Routes } from '@angular/router';
import { authMatchGuard } from './core/guards/auth/auth.guard';
import { nonAuthenticatedMatchGuard } from './core/guards/nonAuth.guard.ts/non-auth.guard';
import { unauthorizedRoutes } from './features/unauthorized/unauthorized.routes';
import { authorizedRoutes } from './features/wrapper/authorized.routes';

export const routes: Routes = [
  {
    path: '',
    children: authorizedRoutes,
    canActivate: [authMatchGuard],
  },
  {
    path: 'auth',
    children: unauthorizedRoutes,
    canActivate: [nonAuthenticatedMatchGuard],
  },

  {
    path: '**',
    redirectTo: '',
  },
];
