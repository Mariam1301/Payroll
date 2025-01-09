import { inject, Inject, Type } from '@angular/core';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Inject({ providedIn: 'root' })
export class UiDialogService {
  private readonly _dialogService = inject(DialogService);

  open(component: Type<unknown>, config?: DynamicDialogConfig) {
    return this._dialogService.open(component, {
      header: '',
      width: '60vw',
      modal: true,
      breakpoints: { '640px': '100vw' },
      ...config,
    });
  }
}
