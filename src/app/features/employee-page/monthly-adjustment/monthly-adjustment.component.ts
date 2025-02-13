import { Component, inject, signal } from '@angular/core';
import { DatePicker } from 'primeng/datepicker';
import { CheckboxModule } from 'primeng/checkbox';
import { DateTypePipe } from '../../../core/pipes/date-type.pipe';
import { Select } from 'primeng/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TranslocoDirective } from '@jsverse/transloco';
import { UiDialogActionsComponent } from '../../../shared/components/dialog-actions/dialog-actions.component';
import { UiFormFieldComponent } from '../../../shared/components/form-field/form-field.component';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EmployeeService } from '../../../core/services/employee/employee.service';
import { formatDateToISODate } from '../../../core/utils/date-formating';
import { MonthlyAdjustment } from '../../../core/models/monthly-adjustment.model';
import { CurrencyEnum } from '../../../core/models/general.model';
import { AsyncPipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'employee-monthly-adjustment',
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
    AsyncPipe,
    ButtonModule,
  ],
  templateUrl: './monthly-adjustment.component.html',
})
export class EmployeeMonthlyAdjustmentComponent {
  monthlyAdjustment = signal<Partial<MonthlyAdjustment>>({});

  private readonly _ref = inject(DynamicDialogRef);
  private readonly _dialogConfig = inject(DynamicDialogConfig);
  private readonly _employeeService = inject(EmployeeService);

  currentMonthlyAdjustment = signal(true);

  now = new Date();

  monthlyAdjustmentTypeOptions = [];

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
    const monthlyAdjustment = { ...this._dialogConfig.data?.monthlyAdjustment };
    monthlyAdjustment && this.monthlyAdjustment.set(monthlyAdjustment);
    this.currentMonthlyAdjustment.set(!monthlyAdjustment?.end_date);
  }

  onSaveClick() {
    const employeeId = this._dialogConfig.data?.employeeId;
    const data = {
      ...this.monthlyAdjustment(),
      start_date: formatDateToISODate(this.monthlyAdjustment().start_date!),
      end_date: formatDateToISODate(this.monthlyAdjustment().end_date!),
    };
    const stream$ = data?.id
      ? this._employeeService.updateBenefit(employeeId, data)
      : this._employeeService.addBenefit(employeeId, data);

    stream$.subscribe(() => this._ref.close(true));
  }

  onCurrentMonthlyAdjustmentChange() {
    this.monthlyAdjustment.update((prev) => ({ ...prev, end_date: undefined }));
  }
}
