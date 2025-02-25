import { Component, signal } from '@angular/core';
import {
  NavigationModel,
  UiNavigationComponent,
} from '../../shared/components/navigation/navigation.component';
import { UiHeaderComponent } from '../../shared/components/header/header.component';
import { RouterModule } from '@angular/router';
import { DrawerModule } from 'primeng/drawer';

@Component({
  selector: 'app-wrapper',
  standalone: true,
  imports: [
    UiHeaderComponent,
    UiNavigationComponent,
    RouterModule,
    DrawerModule,
  ],
  templateUrl: './wrapper.component.html',
})
export class WrapperComponent {
  isMenuOpen = signal(false);

  navigationArray: NavigationModel[] = [
    {
      title: 'company',
      path: 'company',
    },
    {
      title: 'employees',
      path: 'employee',
    },
    // {
    //   title: 'overtimes',
    //   path: 'overtimes',
    // },
    // {
    //   title: 'percentageBonuses',
    //   path: 'percentageBonuses',
    // },
    // {
    //   title: 'oneTimeDeductions',
    //   path: 'oneTimeDeductions',
    // },
    // {
    //   title: 'oneTimeBonuses',
    //   path: 'oneTimeBonuses',
    // },
    {
      title: 'oneTimeSalaryAdjustments',
      path: 'oneTimeSalaryAdjustments',
    },
    {
      title: 'payrollGeneration',
      path: 'payrollGeneration',
    },
  ];

  toggleIsMenuOpen() {
    this.isMenuOpen.set(!this.isMenuOpen());
  }
}
