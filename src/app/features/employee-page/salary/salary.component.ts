import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { UiFormFieldComponent } from '../../../shared/components/form-field/form-field.component';
import { SalaryModel, SalaryTypeEnum } from '../../../core/models/salary.model';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { DropdownModule } from 'primeng/dropdown';
import { UiDialogActionsComponent } from '../../../shared/components/dialog-actions/dialog-actions.component';
import { EmployeeService } from '../../../core/services/employee/employee.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { formatDateToISODate } from '../../../core/utils/date-formating';
import { tap } from 'rxjs';
import { CalendarModule } from 'primeng/calendar';
import { DateTypePipe } from '../../../core/pipes/date-type.pipe';
import { CheckboxModule } from 'primeng/checkbox';
import { CurrencyEnum } from '../../../core/models/general.model';

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
    };
    const stream$ = data?.id
      ? this._employeeService.updateSalary(employeeId, this.salary())
      : this._employeeService.addSalary(employeeId, this.salary());

    stream$
      .pipe(tap((data) => console.log(data)))
      .subscribe(() => this._ref.close(true));
  }

  onCurrentSalaryChange() {
    this.salary.update((prev) => ({ ...prev, end_date: undefined }));
  }
}
