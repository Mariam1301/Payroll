import { Routes } from '@angular/router';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { EmployeePageComponent } from './employee-page.component';

export const employeeRoutes: Routes = [
  {
    path: 'details/:employeeId',
    component: EmployeeDetailsComponent,
  },
  {
    path: '',
    component: EmployeePageComponent,
  },

  {
    path: '**',
    redirectTo: '',
  },
];
