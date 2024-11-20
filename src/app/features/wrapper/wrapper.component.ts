import { Component, inject, signal } from '@angular/core';
import {
  NavigationModel,
  UiNavigationComponent,
} from '../../shared/components/navigation/navigation.component';
import { UiHeaderComponent } from '../../shared/components/header/header.component';
import { RouterModule } from '@angular/router';
import { SidebarModule } from 'primeng/sidebar';
import { TranslocoService } from '@jsverse/transloco';

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
  private readonly _translocoService = inject(TranslocoService);

  navigationArray: NavigationModel[] = [
    {
      title: this._translocoService.translate('companies'),
      path: 'company',
    },
  ];

  toggleIsMenuOpen() {
    this.isMenuOpen.set(!this.isMenuOpen());
  }
}
