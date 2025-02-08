import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UiFormFieldComponent } from '../../../shared/components/form-field/form-field.component';
import { Exemption, LimitType } from '../../../core/models/exemption.model';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EmployeeService } from '../../../core/services/employee/employee.service';
import { formatDateToISODate } from '../../../core/utils/date-formating';
import { DropdownModule } from 'primeng/dropdown';
import { DatePicker } from 'primeng/datepicker';
import { UiDialogActionsComponent } from '../../../shared/components/dialog-actions/dialog-actions.component';
import { CurrencyEnum } from '../../../core/models/general.model';
import { InputTextModule } from 'primeng/inputtext';
import { DateTypePipe } from '../../../core/pipes/date-type.pipe';

@Component({
  templateUrl: './exemptions.component.html',
  standalone: true,
  imports: [
    FormsModule,
    UiFormFieldComponent,
    DropdownModule,
    DatePicker,
    UiDialogActionsComponent,
    TranslocoDirective,
    InputTextModule,
    DateTypePipe,
  ],
})
export class ExemptionsComponent {
  exemption = signal<Partial<Exemption>>({});

  now = new Date();

  private readonly _translocoService = inject(TranslocoService);
  private readonly _ref = inject(DynamicDialogRef);
  private readonly _dialogConfig = inject(DynamicDialogConfig);
  private readonly _employeeService = inject(EmployeeService);

  limitTypeEnum = LimitType;

  limitTypeOptions = signal<{ id: LimitType; label: string }[]>([
    {
      id: LimitType.TIME_BASED,
      label: this._translocoService.translate('timeBased'),
    },
    {
      id: LimitType.AMOUNT_BASED,
      label: this._translocoService.translate('amountBased'),
    },
    {
      id: LimitType.PEMANENT,
      label: this._translocoService.translate('permanent'),
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
      start_date: formatDateToISODate(this.exemption().start_date!),
    };
    const stream$ = data?.id
      ? this._employeeService.updateIncomeTaxExemption(employeeId, data)
      : this._employeeService.addIncomeTaxExemption(employeeId, data);

    stream$.subscribe(() => this._ref.close(true));
  }

  onLimitTypeChange(type: LimitType) {
    this.exemption.update((prev) => ({
      ...prev,
      end_date: undefined,
      amount: undefined,
      start_date: type === LimitType.PEMANENT ? undefined : prev.start_date,
    }));
  }
}
