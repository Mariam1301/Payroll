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
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { DropdownModule } from 'primeng/dropdown';
import { UiDialogActionsComponent } from '../../../shared/components/dialog-actions/dialog-actions.component';
import { EmployeeService } from '../../../core/services/employee/employee.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { formatDateToISODate } from '../../../core/utils/date-formating';
import { CalendarModule } from 'primeng/calendar';
import { DateTypePipe } from '../../../core/pipes/date-type.pipe';
import { CheckboxModule } from 'primeng/checkbox';
import { CurrencyEnum } from '../../../core/models/general.model';
import { MultiSelectModule } from 'primeng/multiselect';

@Component({
  standalone: true,
  templateUrl: './salary.component.html',
  selector: 'app-salary',
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    UiFormFieldComponent,
    TranslocoDirective,
    DropdownModule,
    UiDialogActionsComponent,
    CalendarModule,
    DateTypePipe,
    CheckboxModule,
    MultiSelectModule,
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

  SalaryTypeOptions = signal<{ id: SalaryTypeEnum; label: string }[]>([
    {
      id: SalaryTypeEnum.Daily,
      label: this._translocoService.translate('daily'),
    },
    {
      id: SalaryTypeEnum.Hourly,
      label: this._translocoService.translate('hourly'),
    },
    {
      id: SalaryTypeEnum.Fixed,
      label: this._translocoService.translate('monthlyFixed'),
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

  dailySalaryCalculationBaseOptions = signal<
    { id: DailySalaryCalculationBaseEnum; label: string }[]
  >([
    {
      id: DailySalaryCalculationBaseEnum.CALENDAR_DAYS,
      label: this._translocoService.translate('calendarDays'),
    },
    {
      id: DailySalaryCalculationBaseEnum.WORK_DAYS,
      label: this._translocoService.translate('workingDays'),
    },
  ]);

  nonWorkingDaysOptions = signal<{ id: NonWorkingDaysEnum; label: string }[]>([
    {
      id: NonWorkingDaysEnum.PUBLIC_HOLIDAYS_UNDER_GEORGIAN_LAW,
      label: this._translocoService.translate('publicHolidaysUnderGeorgianLaw'),
    },
    {
      id: NonWorkingDaysEnum.EVERY_MONDAY,
      label: this._translocoService.translate('everyMonday'),
    },
    {
      id: NonWorkingDaysEnum.EVERY_TUESDAY,
      label: this._translocoService.translate('everyTuesday'),
    },
    {
      id: NonWorkingDaysEnum.EVERY_WEDNESDAY,
      label: this._translocoService.translate('everyWednesday'),
    },
    {
      id: NonWorkingDaysEnum.EVERY_THURSDAY,
      label: this._translocoService.translate('everyThursday'),
    },
    {
      id: NonWorkingDaysEnum.EVERY_FRIDAY,
      label: this._translocoService.translate('everyFriday'),
    },
    {
      id: NonWorkingDaysEnum.EVERY_SATURDAY,
      label: this._translocoService.translate('everySaturday'),
    },
    {
      id: NonWorkingDaysEnum.EVERY_SUNDAY,
      label: this._translocoService.translate('everySunday'),
    },
    {
      id: NonWorkingDaysEnum.CUSTOM_DATES,
      label: this._translocoService.translate('selectFromCalendar'),
    },
  ]);

  ngOnInit(): void {
    const salary = this._dialogConfig.data?.salary;
    salary && this.salary.set(salary);
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
      ? this._employeeService.updateSalary(employeeId, this.salary())
      : this._employeeService.addSalary(employeeId, this.salary());

    // stream$
    //   .pipe(tap((data) => console.log(data)))
    //   .subscribe(() => this._ref.close(true));
    console.log(data);
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
    }));
  }

  onNonWorkingDaysChange() {
    this.salary.update((prev) => ({
      ...prev,
      non_working_custom_dates: undefined,
    }));
  }

  onCurrentSalaryChange() {
    this.salary.update((prev) => ({ ...prev, end_date: undefined }));
  }
}
