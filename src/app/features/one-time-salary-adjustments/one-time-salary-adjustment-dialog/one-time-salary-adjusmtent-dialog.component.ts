import { Component, inject, signal } from '@angular/core';
import { DatePicker } from 'primeng/datepicker';
import { CheckboxModule } from 'primeng/checkbox';
import { Select } from 'primeng/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { UiDialogActionsComponent } from '../../../shared/components/dialog-actions/dialog-actions.component';
import { UiFormFieldComponent } from '../../../shared/components/form-field/form-field.component';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EmployeeService } from '../../../core/services/employee/employee.service';
import { formatDateToISODate } from '../../../core/utils/date-formating';
import { toSignal } from '@angular/core/rxjs-interop';
import { InputNumberModule } from 'primeng/inputnumber';
import {
  OneTimeSalaryAdjustment,
  OneTimeSalaryAdjustmentDialogInfo,
} from '../../../core/models/one-time-salary-adjustment.model';
import { MultiSelectModule } from 'primeng/multiselect';
import {
  ADJUSTMENT_TYPES,
  CURRENCY_OPTIONS,
} from '../../../core/constants/general.constants';
import { TextareaModule } from 'primeng/textarea';
import { map } from 'rxjs';

@Component({
  selector: 'app-one-time-salary-adjustment-dialog',
  standalone: true,
  imports: [
    DatePicker,
    CheckboxModule,
    Select,
    FormsModule,
    InputTextModule,
    ReactiveFormsModule,
    TranslocoDirective,
    UiDialogActionsComponent,
    UiFormFieldComponent,
    InputNumberModule,
    MultiSelectModule,
    TextareaModule,
  ],
  templateUrl: './one-time-salary-adjusmtent-dialog.component.html',
})
export class OneTimeSalaryAdjustmentDialogComponent {
  oneTimeSalaryAdjustment = signal<Partial<OneTimeSalaryAdjustment>>({});

  private readonly _ref = inject(DynamicDialogRef);
  private readonly _dialogConfig = inject(
    DynamicDialogConfig<OneTimeSalaryAdjustmentDialogInfo>,
  );
  private readonly _employeeService = inject(EmployeeService);
  private readonly _translocoService = inject(TranslocoService);

  employees = toSignal<any[] | undefined>(
    this._employeeService.getAll().pipe(
      map((employees) =>
        employees.map((employee) => ({
          ...employee,
          label: employee.name + ' ' + employee.surname,
        })),
      ),
    ),
  );

  now = new Date();

  currencyOptions = CURRENCY_OPTIONS;

  adjustmentTypeOptions = ADJUSTMENT_TYPES.map((option) => ({
    ...option,
    label: this._translocoService.translate(option.label),
  }));

  ngOnInit(): void {
    const oneTimeSalaryAdjustment = {
      ...this._dialogConfig.data.oneTimeSalaryAdjustment,
    };
    oneTimeSalaryAdjustment &&
      this.oneTimeSalaryAdjustment.set(oneTimeSalaryAdjustment);
  }

  onSaveClick() {
    const data = {
      ...this.oneTimeSalaryAdjustment(),
      date: formatDateToISODate(this.oneTimeSalaryAdjustment().date!),
    };
    console.log(data);
    const stream$ = data?.id
      ? this._employeeService.updateOneTimeSalaryAdjustment(
          data.employee_id!,
          data,
        )
      : this._employeeService.addOneTimeSalaryAdjustment(
          data.employee_id!,
          data,
        );

    stream$.subscribe(() => this._ref.close(true));
  }
}
