import { Routes } from '@angular/router';
import { WrapperComponent } from './wrapper.component';

export const authorizedRoutes: Routes = [
  {
    path: '',
    component: WrapperComponent,
    children: [
      {
        path: 'company',
        loadComponent: () =>
          import('../company-page/company-details/company-details.component').then(
            (m) => m.CompanyDetailsComponent
          ),
      },
      {
        path: 'employee',
        loadChildren: () =>
          import('../employee-page/employee.routes').then(
            (r) => r.employeeRoutes
          ),
      },
      {
        path: '**',
        redirectTo: 'company',
      },
    ],
  },
];
