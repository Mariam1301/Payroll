import { Component, inject, OnInit, signal } from '@angular/core';
import { DatePicker } from 'primeng/datepicker';
import { CheckboxModule } from 'primeng/checkbox';
import { DateTypePipe } from '../../../core/pipes/date-type.pipe';
import { Select } from 'primeng/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { UiDialogActionsComponent } from '../../../shared/components/dialog-actions/dialog-actions.component';
import { UiFormFieldComponent } from '../../../shared/components/form-field/form-field.component';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EmployeeService } from '../../../core/services/employee/employee.service';
import { formatDateToISODate } from '../../../core/utils/date-formating';
import { CurrencyEnum } from '../../../core/models/general.model';
import { IncentiveBonus } from '../../../core/models/incentive-bonus';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-incentive-bonus',
  standalone: true,
  imports: [
    DatePicker,
    CheckboxModule,
    DateTypePipe,
    Select,
    FormsModule,
    InputTextModule,
    ReactiveFormsModule,
    TranslocoDirective,
    UiDialogActionsComponent,
    UiFormFieldComponent,
    InputNumberModule,
  ],
  templateUrl: './incentive-bonus.component.html',
})
export class IncentiveBonusComponent implements OnInit {
  incentiveBonus = signal<Partial<IncentiveBonus>>({});

  private readonly _translocoService = inject(TranslocoService);
  private readonly _ref = inject(DynamicDialogRef);
  private readonly _dialogConfig = inject(DynamicDialogConfig);
  private readonly _employeeService = inject(EmployeeService);

  currentIncentiveBonus = signal(true);

  now = new Date();

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
    const incentiveBonus = { ...this._dialogConfig.data?.incentiveBonus };
    incentiveBonus && this.incentiveBonus.set(incentiveBonus);
    this.currentIncentiveBonus.set(!incentiveBonus?.end_date);
  }

  onSaveClick() {
    const employeeId = this._dialogConfig.data?.employeeId;
    const data = {
      ...this.incentiveBonus(),
      start_date: formatDateToISODate(this.incentiveBonus().start_date!),
      end_date: formatDateToISODate(this.incentiveBonus().end_date!),
    };
    const stream$ = data?.id
      ? this._employeeService.updateIncentiveBonus(employeeId, data)
      : this._employeeService.addIncentiveBonus(employeeId, data);

    stream$.subscribe(() => this._ref.close(true));
  }

  onCurrentIncentiveBonusChange() {
    this.incentiveBonus.update((prev) => ({ ...prev, end_date: undefined }));
  }
}
