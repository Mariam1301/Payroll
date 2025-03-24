import { Component, inject, signal } from '@angular/core';
import { DatePicker } from 'primeng/datepicker';
import { CheckboxModule } from 'primeng/checkbox';
import { DateTypePipe } from '../../../core/pipes/date-type.pipe';
import { Select } from 'primeng/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { UiDialogActionsComponent } from '../../../shared/components/dialog-actions/dialog-actions.component';
import { UiFormFieldComponent } from '../../../shared/components/form-field/form-field.component';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { EmployeeService } from '../../../core/services/employee/employee.service';
import { formatDateToISODate } from '../../../core/utils/date-formating';
import { CURRENCY_OPTIONS } from '../../../core/constants/general.constants';
import { InitialSalaryBalance } from '../../../core/models/initial-salary-balance';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'employee-initial-salary-balance',
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
    ButtonModule,
  ],
  templateUrl: './initial-salary-balance.component.html',
})
export class EmployeeInitialSalaryBalanceComponent {
  initialSalaryAdjustment = signal<Partial<InitialSalaryBalance>>({});

  private readonly _ref = inject(DynamicDialogRef);
  private readonly _dialogConfig = inject(DynamicDialogConfig);

  currencyOptions = CURRENCY_OPTIONS;

  now = new Date();

  ngOnInit(): void {
    const initialSalaryAdjustment = {
      ...this._dialogConfig.data,
    };
    initialSalaryAdjustment &&
      this.initialSalaryAdjustment.set(initialSalaryAdjustment);
  }

  onSaveClick() {
    const employeeId = this._dialogConfig.data?.employeeId;
    const data = {
      ...this.initialSalaryAdjustment(),
    };
    console.log(data);
    this._ref.close(data);
    // const stream$ = data?.id
    //   ? this._employeeService.updateMonthlySalaryAdjustment(employeeId, data)
    //   : this._employeeService.addMonthlySalaryAdjustment(employeeId, data);
    // stream$.subscribe(() => this._ref.close(true));
  }
}
