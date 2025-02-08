import { Component, inject, signal } from '@angular/core';
import { DatePicker } from 'primeng/datepicker';
import { CheckboxModule } from 'primeng/checkbox';
import { DateTypePipe } from '../../../core/pipes/date-type.pipe';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TranslocoDirective } from '@jsverse/transloco';
import { UiDialogActionsComponent } from '../../../shared/components/dialog-actions/dialog-actions.component';
import { UiFormFieldComponent } from '../../../shared/components/form-field/form-field.component';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EmployeeService } from '../../../core/services/employee/employee.service';
import { formatDateToISODate } from '../../../core/utils/date-formating';
import { MonthlyOvertimeType } from '../../../core/models/monthly-overtime.model';
import { MonthlyOvertimesService } from '../../../core/services/monthly-overtimes/monthly-overtimes.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-monthly-overtimes-dialog',
  standalone: true,
  imports: [
    DatePicker,
    CheckboxModule,
    DateTypePipe,
    DropdownModule,
    FormsModule,
    InputTextModule,
    ReactiveFormsModule,
    TranslocoDirective,
    UiDialogActionsComponent,
    UiFormFieldComponent,
    InputNumberModule,
  ],
  templateUrl: './monthly-overtimes-dialog.component.html',
})
export class MonthlyOvertimesDialogComponent {
  monthlyOvertime = signal<Partial<MonthlyOvertimeType>>({});

  private readonly _ref = inject(DynamicDialogRef);
  private readonly _dialogConfig = inject(DynamicDialogConfig);
  private readonly _employeeService = inject(EmployeeService);
  private readonly _monthlyOvertimeService = inject(MonthlyOvertimesService);

  employees = toSignal<any[] | undefined>(this._employeeService.getAll());

  overtimeTypes = [
    {
      id: 1,
      name: 'Regular',
    },
    {
      id: 2,
      name: 'Weekend',
    },
    {
      id: 3,
      name: 'Holiday',
    },
  ];

  now = new Date();

  ngOnInit(): void {
    const monthlyOvertime = { ...this._dialogConfig.data?.deduction };
    monthlyOvertime && this.monthlyOvertime.set(monthlyOvertime);
  }

  onSaveClick() {
    const data = {
      ...this.monthlyOvertime(),
      date_from: formatDateToISODate(this.monthlyOvertime().date_from!),
      date_to: formatDateToISODate(this.monthlyOvertime().date_to!),
    };
    console.log(data);
    // const stream$ = data?.id
    //   ? this._monthlyOvertimeService.update(data)
    //   : this._employeeService.add(data);

    // stream$.subscribe(() => this._ref.close(true));
  }
}
