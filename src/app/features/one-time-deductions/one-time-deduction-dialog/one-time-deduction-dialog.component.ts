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
import { toSignal } from '@angular/core/rxjs-interop';
import { InputNumberModule } from 'primeng/inputnumber';
import { OneTimeDeduction } from '../../../core/models/one-time-deduction.model';
import { CurrencyEnum } from '../../../core/models/general.model';

@Component({
  selector: 'app-one-time-deduction-dialog',
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
  templateUrl: './one-time-deduction-dialog.component.html',
})
export class OneTImeDeductionDialogComponent {
  oneTimeDeduction = signal<Partial<OneTimeDeduction>>({});

  private readonly _ref = inject(DynamicDialogRef);
  private readonly _dialogConfig = inject(DynamicDialogConfig);
  private readonly _employeeService = inject(EmployeeService);
  // private readonly _monthlyOvertimeService = inject(MonthlyOvertimesService);

  employees = toSignal<any[] | undefined>(this._employeeService.getAll());

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
    const oneTimeDeduction = { ...this._dialogConfig.data?.oneTimeDeduction };
    oneTimeDeduction && this.oneTimeDeduction.set(oneTimeDeduction);
  }

  onSaveClick() {
    const data = {
      ...this.oneTimeDeduction(),
      date_from: formatDateToISODate(this.oneTimeDeduction().date_from!),
      date_to: formatDateToISODate(this.oneTimeDeduction().date_to!),
    };
    console.log(data);
    // const stream$ = data?.id
    //   ? this._monthlyOvertimeService.update(data)
    //   : this._employeeService.add(data);

    // stream$.subscribe(() => this._ref.close(true));
  }
}
