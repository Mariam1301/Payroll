import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UiFormFieldComponent } from '../../../shared/components/form-field/form-field.component';
import { Exemption, LimitType } from '../../../core/models/exemption.model';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { EmployeeService } from '../../../core/services/employee/employee.service';
import { formatDateToISODate } from '../../../core/utils/date-formating';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { UiDialogActionsComponent } from '../../../shared/components/dialog-actions/dialog-actions.component';
import { CurrencyEnum } from '../../../core/models/general.model';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  templateUrl: './exemptions.component.html',
  standalone: true,
  imports: [
    FormsModule,
    UiFormFieldComponent,
    DropdownModule,
    CalendarModule,
    UiDialogActionsComponent,
    TranslocoDirective,
    InputTextModule,
  ],
})
export class ExemptionsComponent {
  exemption = signal<Partial<Exemption>>({});

  private readonly _translocoService = inject(TranslocoService);
  private readonly _ref = inject(DynamicDialogRef);
  private readonly _dialogConfig = inject(DynamicDialogConfig);
  private readonly _employeeService = inject(EmployeeService);

  limitTypeOptions = signal<{ id: LimitType; label: string }[]>([
    {
      id: LimitType.TIME_BASED,
      label: this._translocoService.translate('timeBased'),
    },
    {
      id: LimitType.AMOUNT_BASED,
      label: this._translocoService.translate('amountBased'),
    },
  ]);

  currencyOptions = signal<{ id: CurrencyEnum; label: string }[]>([
    {
      id: CurrencyEnum.GEL,
      label: 'GEL',
    },
    {
      id: CurrencyEnum.EUR,
      label: 'EUR',
    },
    {
      id: CurrencyEnum.USD,
      label: 'USD',
    },
  ]);

  ngOnInit(): void {
    const exemption = this._dialogConfig.data?.exemption;
    exemption && this.exemption.set(exemption);
  }

  onSaveClick() {
    const employeeId = this._dialogConfig.data?.employeeId;
    const data = {
      ...this.exemption(),
      end_date: formatDateToISODate(this.exemption().end_date!),
    };
    const stream$ = data?.id
      ? this._employeeService.updateDeduction(employeeId, data)
      : this._employeeService.addDeduction(employeeId, data);

    stream$.subscribe(() => this._ref.close(true));
  }

  onCurrentDeductionChange() {
    this.exemption.update((prev) => ({ ...prev, end_date: undefined }));
  }
}
