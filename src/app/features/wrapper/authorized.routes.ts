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
          import(
            '../company-page/company-details/company-details.component'
          ).then((m) => m.CompanyDetailsComponent),
      },
      {
        path: 'employee',
        loadChildren: () =>
          import('../employee-page/employee.routes').then(
            (r) => r.employeeRoutes,
          ),
      },
      {
        path: 'overtimes',
        loadComponent: () =>
          import('../monthly-overtimes/monthly-overtimes.component').then(
            (r) => r.MonthlyOvertimesComponent,
          ),
      },{
        path: 'percentageBonuses',
        loadComponent: () =>
          import('../percentage-bonuses/percentage-bonucses.component').then(
            (r) => r.PercentageBonucsesComponent,
          ),
      },
      {
        path: '**',
        redirectTo: 'company',
      },
    ],
  },
];
