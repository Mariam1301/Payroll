import { Routes } from '@angular/router';
import { LoginPageComponent } from './features/login-page/login-page.component';
import { WrapperComponent } from './features/wrapper/wrapper.component';
import { authGuard } from './core/guards/auth/auth.guard';
import { loggedInAuthGuardGuard } from './core/guards/logged-in-auth/logged-in-auth-guard.guard';

export const routes: Routes = [
  {
    path: '',
    component: WrapperComponent,
    canActivate: [authGuard],
  },
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [loggedInAuthGuardGuard],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
