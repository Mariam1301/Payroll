import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { UiFormFieldComponent } from '../../../shared/components/form-field/form-field.component';
import {
  DailySalaryCalculationBaseEnum,
  NonWorkingDaysEnum,
  SalaryModel,
  SalaryTypeEnum,
} from '../../../core/models/salary.model';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { Select } from 'primeng/select';
import { UiDialogActionsComponent } from '../../../shared/components/dialog-actions/dialog-actions.component';
import { EmployeeService } from '../../../core/services/employee/employee.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { formatDateToISODate } from '../../../core/utils/date-formating';
import { DatePicker } from 'primeng/datepicker';
import { DateTypePipe } from '../../../core/pipes/date-type.pipe';
import { CheckboxModule } from 'primeng/checkbox';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputNumberModule } from 'primeng/inputnumber';
import { CURRENCY_OPTIONS } from '../../../core/constants/general.constants';
import {
  DAILY_SALARY_CALCULATION_BASE_OPTIONS,
  NON_WORKING_DAYS_OPTIONS,
  SALARY_TYPE_OPTIONS,
} from '../../../core/constants/salary.constants';

@Component({
  standalone: true,
  templateUrl: './salary.component.html',
  selector: 'app-salary',
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    UiFormFieldComponent,
    TranslocoModule,
    Select,
    UiDialogActionsComponent,
    DatePicker,
    DateTypePipe,
    CheckboxModule,
    MultiSelectModule,
    InputNumberModule,
  ],
})
export class SalaryComponent implements OnInit {
  salary = signal<Partial<SalaryModel>>({});

  private readonly _translocoService = inject(TranslocoService);
  private readonly _ref = inject(DynamicDialogRef);
  private readonly _dialogConfig = inject(DynamicDialogConfig);
  private readonly _employeeService = inject(EmployeeService);

  currentSalary = signal(true);

  now = new Date();

  dailySalaryCalculationBaseEnum = DailySalaryCalculationBaseEnum;
  salaryTypeEnum = SalaryTypeEnum;
  nonWorkingDaysEnum = NonWorkingDaysEnum;

  SalaryTypeOptions = SALARY_TYPE_OPTIONS.map((option) => ({
    ...option,
    label: this._translocoService.translate(option.label),
  }));

  currencyOptions = CURRENCY_OPTIONS;

  dailySalaryCalculationBaseOptions = DAILY_SALARY_CALCULATION_BASE_OPTIONS.map(
    (option) => ({
      ...option,
      label: this._translocoService.translate(option.label),
    }),
  );

  nonWorkingDaysOptions = NON_WORKING_DAYS_OPTIONS.map((option) => ({
    ...option,
    label: this._translocoService.translate(option.label),
  }));

  ngOnInit(): void {
    const salary = { ...this._dialogConfig.data?.salary };
    salary && this.salary.set(salary);
    this.currentSalary.set(!salary?.end_date);
  }

  onSaveClick() {
    const employeeId = this._dialogConfig.data?.employeeId;
    const data = {
      ...this.salary(),
      start_date: formatDateToISODate(this.salary().start_date!),
      end_date: formatDateToISODate(this.salary().end_date!),
      non_working_custom_dates: this.salary().non_working_custom_dates?.map(
        (date) => formatDateToISODate(date),
      ),
    };

    const stream$ = data?.id
      ? this._employeeService.updateSalary(
          employeeId,
          data as Partial<SalaryModel>,
        )
      : this._employeeService.addSalary(
          employeeId,
          data as Partial<SalaryModel>,
        );

    stream$.subscribe(() => this._ref.close(true));
  }

  onCustomNonWorkingDaysChange(item: NonWorkingDaysEnum) {
    if (item === NonWorkingDaysEnum.CUSTOM_DATES) {
      this.salary.update((prev) => ({ ...prev, non_working_days: [] }));
    }
  }

  onDailySalaryCalculationBaseChange() {
    this.salary.update((prev) => ({
      ...prev,
      non_working_days: undefined,
      non_working_custom_dates: undefined,
    }));
  }

  onSalaryTypeChange() {
    this.salary.update((prev) => ({
      ...prev,
      daily_salary_calculation_base: undefined,
      non_working_days: undefined,
      daily_working_hours: undefined,
      monthly_working_days: undefined,
    }));
  }

  onNonWorkingDaysChange() {
    this.salary.update((prev) => ({
      ...prev,
      non_working_custom_dates: undefined,
    }));
  }

  onCurrentSalaryChange() {
    this.salary.update((prev) => ({ ...prev, end_date: null }));
  }
}
