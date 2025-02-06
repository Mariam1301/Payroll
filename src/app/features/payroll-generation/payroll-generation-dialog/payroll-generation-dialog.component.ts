import { Component, inject, signal } from '@angular/core';
import { CalendarModule } from 'primeng/calendar';
import { DateTypePipe } from '../../../core/pipes/date-type.pipe';
import { DropdownModule } from 'primeng/dropdown';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { PrimeTemplate } from 'primeng/api';
import { TranslocoDirective } from '@jsverse/transloco';
import { UiDialogActionsComponent } from '../../../shared/components/dialog-actions/dialog-actions.component';
import { UiFormFieldComponent } from '../../../shared/components/form-field/form-field.component';
import { PayrollGenerationModel } from '../../../core/models/payroll-generation.model';
import { MultiSelectModule } from 'primeng/multiselect';
import { toSignal } from '@angular/core/rxjs-interop';
import { EmployeeService } from '../../../core/services/employee/employee.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { JsonPipe } from '@angular/common';
import { ChipModule } from 'primeng/chip';
import { stringify } from 'qs';
import { formatDateToISODate } from '../../../core/utils/date-formating';

@Component({
  selector: 'app-payroll-generation-dialog',
  standalone: true,
  imports: [
    CalendarModule,
    DateTypePipe,
    DropdownModule,
    FormsModule,
    InputNumberModule,
    PrimeTemplate,
    ReactiveFormsModule,
    TranslocoDirective,
    UiDialogActionsComponent,
    UiFormFieldComponent,
    MultiSelectModule,
    ChipModule,
  ],
  templateUrl: './payroll-generation-dialog.component.html',
})
export class PayrollGenerationDialogComponent {
  payrollGenerationData = signal<Partial<PayrollGenerationModel>>({});
  private readonly _ref = inject(DynamicDialogRef);

  private readonly _employeeService = inject(EmployeeService);

  employees = toSignal<any[] | undefined>(this._employeeService.getAll());

  now = new Date();

  onRemoveItem(id: number) {
    this.payrollGenerationData.update((prev) => ({
      ...prev,
      employee_ids: prev.employee_ids?.filter(
        (employee_id) => employee_id !== id,
      ),
    }));
  }

  onGenerateClick() {
    this._ref.close({
      ...this.payrollGenerationData(),
      // start_date: formatDateToISODate(this.payrollGenerationData().start_date!),
      // end_date: formatDateToISODate(this.payrollGenerationData().end_date!),
    });
  }
}
