import { Component, inject, signal } from '@angular/core';
import { DatePicker } from 'primeng/datepicker';
import { DateTypePipe } from '../../../core/pipes/date-type.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { TranslocoDirective } from '@jsverse/transloco';
import { UiDialogActionsComponent } from '../../../shared/components/dialog-actions/dialog-actions.component';
import { UiFormFieldComponent } from '../../../shared/components/form-field/form-field.component';
import { PayrollGenerationModel } from '../../../core/models/payroll-generation.model';
import { MultiSelectModule } from 'primeng/multiselect';
import { toSignal } from '@angular/core/rxjs-interop';
import { EmployeeService } from '../../../core/services/employee/employee.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ChipModule } from 'primeng/chip';
import { map } from 'rxjs';
import { CalculationConfigurationComponent } from '../calculation-configuration/calculation-configuration.component';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-payroll-generation-dialog',
  standalone: true,
  imports: [
    DatePicker,
    DateTypePipe,
    FormsModule,
    InputNumberModule,
    ReactiveFormsModule,
    TranslocoDirective,
    UiDialogActionsComponent,
    UiFormFieldComponent,
    MultiSelectModule,
    ChipModule,
    CalculationConfigurationComponent,
    JsonPipe,
  ],
  templateUrl: './payroll-generation-dialog.component.html',
})
export class PayrollGenerationDialogComponent {
  payrollGenerationData = signal<Partial<PayrollGenerationModel>>({});
  private readonly _ref = inject(DynamicDialogRef);

  private readonly _employeeService = inject(EmployeeService);

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

  selectedCalculationFields = signal<number[]>([]);
  proportionalFields = signal<number[]>([]);

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
    });
  }
}
