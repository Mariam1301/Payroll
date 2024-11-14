import { Routes } from '@angular/router';
import { WrapperComponent } from './features/wrapper/wrapper.component';
import { authGuard } from './core/guards/auth/auth.guard';
import { loggedInAuthGuardGuard } from './core/guards/logged-in-auth/logged-in-auth-guard.guard';
import { RegistrationPageComponent } from './features/registration-page/registration-page.component';

export const routes: Routes = [
  {
    path: '',
    component: WrapperComponent,
    canActivate: [authGuard],
  },
  {
    path: 'login',
    component: RegistrationPageComponent,
    canActivate: [loggedInAuthGuardGuard],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
