import { Component, inject, signal } from '@angular/core';
import {
  NavigationModel,
  UiNavigationComponent,
} from '../../shared/components/navigation/navigation.component';
import { UiHeaderComponent } from '../../shared/components/header/header.component';
import { RouterModule } from '@angular/router';
import { SidebarModule } from 'primeng/sidebar';

@Component({
  selector: 'app-wrapper',
  standalone: true,
  imports: [
    UiHeaderComponent,
    UiNavigationComponent,
    RouterModule,
    SidebarModule,
  ],
  templateUrl: './wrapper.component.html',
})
export class WrapperComponent {
  isMenuOpen = signal(false);

  navigationArray: NavigationModel[] = [
    {
      title: 'companies',
      path: 'company',
    },
    {
      title: 'employees',
      path: 'employee',
    },
    {
      title: 'overtimes',
      path: 'overtimes',
    },
    {
      title: 'percentageBonuses',
      path: 'percentageBonuses',
    },
    {
      title: 'oneTimeDeductions',
      path: 'oneTimeDeductions',
    },
    {
      title: 'oneTimeBonuses',
      path: 'oneTimeBonuses',
    },
  ];

  toggleIsMenuOpen() {
    this.isMenuOpen.set(!this.isMenuOpen());
  }
}
