import { Component, inject, input, output, signal } from '@angular/core';
import { Employee } from '../../../../core/models/employee.model';
import { PreviewFieldComponent } from '../../../../shared/components/preview-field/preview-field.component';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { InitialSalaryBalance } from '../../../../core/models/initial-salary-balance';
import { CurrencyEnum } from '../../../../core/models/general.model';
import { EmployeeInitialSalaryBalanceComponent } from '../../initial-salary-balance/initial-salary-balance.component';
import { UiDialogService } from '../../../../core/services/dialog/dialog.service';

@Component({
  selector: 'employee-initial-salary-balance-information',
  standalone: true,
  imports: [PreviewFieldComponent, TranslocoDirective],
  templateUrl: './initial-salary-balance-information.component.html',
})
export class InitialSalaryBalanceInformationComponent {
  initialSalaryBalanceInformation = signal<InitialSalaryBalance | null>(null);

  private _dialogService = inject(UiDialogService);
  private _translocoService = inject(TranslocoService);
  onEditClick() {
    this._dialogService.open(EmployeeInitialSalaryBalanceComponent, {
      header: this._translocoService.translate('initialSalaryBalance'),
      data: { ...this.initialSalaryBalanceInformation() },
    });
    //   .onClose.subscribe((data) => !!data && this.fetchGeneralDetails());
  }

  onAddClick() {
    this._dialogService
      .open(EmployeeInitialSalaryBalanceComponent, {
        header: this._translocoService.translate('initialSalaryBalance'),
        data: null,
      })
      .onClose.subscribe(
        (data) =>
          !!data &&
          this.initialSalaryBalanceInformation.set({ ...data, id: 1 }),
      );
  }
}
