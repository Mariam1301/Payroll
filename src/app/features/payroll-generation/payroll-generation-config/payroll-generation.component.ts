import {
  AfterViewInit,
  Component,
  effect,
  inject,
  model,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { DatePicker } from 'primeng/datepicker';
import { DateTypePipe } from '../../../core/pipes/date-type.pipe';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { TranslocoDirective } from '@jsverse/transloco';
import { UiDialogActionsComponent } from '../../../shared/components/dialog-actions/dialog-actions.component';
import { UiFormFieldComponent } from '../../../shared/components/form-field/form-field.component';
import { PayrollGenerationModel } from '../../../core/models/payroll-generation.model';
import { MultiSelectModule } from 'primeng/multiselect';
import { toSignal } from '@angular/core/rxjs-interop';
import { EmployeeService } from '../../../core/services/employee/employee.service';
import { ChipModule } from 'primeng/chip';
import { map } from 'rxjs';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-payroll-generation-config',
  standalone: true,
  imports: [
    DatePicker,
    DateTypePipe,
    FormsModule,
    InputNumberModule,
    ReactiveFormsModule,
    TranslocoDirective,
    UiFormFieldComponent,
    MultiSelectModule,
    ChipModule,
    ButtonModule,
    // JsonPipe,
  ],
  templateUrl: './payroll-generation.component.html',
})
export class PayrollGenerationConfigComponent implements AfterViewInit {
  form = viewChild<NgForm>('form');
  generatePayrollClicked = output<Partial<PayrollGenerationModel>>();

  disabled = model<boolean>();

  payrollGenerationData = signal<Partial<PayrollGenerationModel>>({
    regular_adjustments: [],
    prorate_adjustments: [],
  });

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

  ngAfterViewInit(): void {
    if (this.form()) {
      this.form()!.valueChanges?.subscribe((value) => this.disabled.set(false));
    }
  }

  onRemoveItem(id: number) {
    this.payrollGenerationData.update((prev) => ({
      ...prev,
      employee_ids: prev.employee_ids?.filter(
        (employee_id) => employee_id !== id,
      ),
    }));
  }

  onGenerateClick() {
    // this._ref.close({
    //   ...this.payrollGenerationData(),
    //   regular_adjustments:
    //     this.payrollGenerationData()?.regular_adjustments?.filter(
    //       (a) =>
    //         !this.payrollGenerationData()?.prorate_adjustments?.includes(a),
    //     ),
    // });
  }
}
