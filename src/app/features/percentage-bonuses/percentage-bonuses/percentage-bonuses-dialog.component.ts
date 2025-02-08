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
import { toSignal } from '@angular/core/rxjs-interop';
import { InputNumberModule } from 'primeng/inputnumber';
import { PercentageBonus } from '../../../core/models/percentage-bonus.model';

@Component({
  selector: 'app-percentage-bonus-dialog',
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
  templateUrl: './percentage-bonuses-dialog.component.html',
})
export class PercentageBonusesDialogComponent {
  percentageBonus = signal<Partial<PercentageBonus>>({});

  private readonly _ref = inject(DynamicDialogRef);
  private readonly _dialogConfig = inject(DynamicDialogConfig);
  private readonly _employeeService = inject(EmployeeService);
  // private readonly _monthlyOvertimeService = inject(MonthlyOvertimesService);

  employees = toSignal<any[] | undefined>(this._employeeService.getAll());

  incentiveBonusTypes = [
    {
      id: 1,
      name: 'Regular',
    },
    {
      id: 2,
      name: 'sales',
    },
    {
      id: 3,
      name: 'quarter',
    },
  ];

  now = new Date();

  ngOnInit(): void {
    const percentageBonus = { ...this._dialogConfig.data?.percentageBonus };
    percentageBonus && this.percentageBonus.set(percentageBonus);
  }

  onSaveClick() {
    const data = {
      ...this.percentageBonus(),
      date_from: formatDateToISODate(this.percentageBonus().date_from!),
      date_to: formatDateToISODate(this.percentageBonus().date_to!),
    };
    console.log(data);
    // const stream$ = data?.id
    //   ? this._monthlyOvertimeService.update(data)
    //   : this._employeeService.add(data);

    // stream$.subscribe(() => this._ref.close(true));
  }
}
