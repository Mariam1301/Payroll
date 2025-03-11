import { Component, inject, signal } from '@angular/core';
import { DatePicker } from 'primeng/datepicker';
import { CheckboxModule } from 'primeng/checkbox';
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
import { toSignal } from '@angular/core/rxjs-interop';
import { InputNumberModule } from 'primeng/inputnumber';
import { MultiSelectModule } from 'primeng/multiselect';
import {
  ADJUSTMENT_TYPES,
  CURRENCY_OPTIONS,
} from '../../../core/constants/general.constants';
import { TextareaModule } from 'primeng/textarea';
import { map } from 'rxjs';
import {
  TimeBasedSalaryAdjustment,
  TimeBasedSalaryAdjustmentDialogInfo,
} from '../../../core/models/time-based-salary-adjustment.model';
import { ButtonModule } from 'primeng/button';
import { TimeBasedSalaryAdjustmentTypeComponent } from '../../company-page/time-based-salary-adjustment-type/time-based-salary-adjustment-type.component';

@Component({
  selector: 'app-time-based-salary-adjustment-dialog',
  standalone: true,
  imports: [
    DatePicker,
    CheckboxModule,
    Select,
    FormsModule,
    InputTextModule,
    ReactiveFormsModule,
    TranslocoDirective,
    UiDialogActionsComponent,
    UiFormFieldComponent,
    InputNumberModule,
    MultiSelectModule,
    TextareaModule,
    ButtonModule,
  ],
  templateUrl: './time-based-salary-adjustments.component.html',
})
export class TimeBasedSalaryAdjustmentDialogComponent {
  timeBasedSalaryAdjustment = signal<Partial<TimeBasedSalaryAdjustment>>({});

  private readonly _ref = inject(DynamicDialogRef);
  private readonly _dialogConfig = inject(
    DynamicDialogConfig<TimeBasedSalaryAdjustmentDialogInfo>,
  );
  private readonly _employeeService = inject(EmployeeService);
  private readonly _translocoService = inject(TranslocoService);
  private readonly _dialogService = inject(DialogService);

  timeBasedSalaryAdjustmentTypes = signal([]);

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

  currencyOptions = CURRENCY_OPTIONS;

  adjustmentTypeOptions = ADJUSTMENT_TYPES.map((option) => ({
    ...option,
    label: this._translocoService.translate(option.label),
  }));

  ngOnInit(): void {
    const timeBasedSalaryAdjustment = {
      ...this._dialogConfig.data.timeBasedSalaryAdjustment,
    };
    timeBasedSalaryAdjustment &&
      this.timeBasedSalaryAdjustment.set(timeBasedSalaryAdjustment);
  }

  onAddNewMonthlySalaryAdjustmentType() {
    this._dialogService
      .open(TimeBasedSalaryAdjustmentTypeComponent, {
        header: this._translocoService.translate(
          'timeBasedSalaryAdjustmentType',
        ),
        closable: true,
        data: { timeBasedSalaryAdjustmentType: null },
      })
      .onClose.subscribe((data) => {
        if (!!data) {
          this.getMonthlySalaryAdjustmentTypeOptions();
          this.timeBasedSalaryAdjustment.update((prev) => ({
            ...prev,
            type: data.id,
          }));
        }
      });
  }

  private getMonthlySalaryAdjustmentTypeOptions() {
    // this._monthlySalaryAdjustmentsService
    //   .getAll()
    //   .pipe(
    //     map((options) =>
    //       options.map((option) => ({
    //         ...option,
    //         name: `${option.name} - ${this._translocoService.translate(option.type === MonthlySalaryAdjustmentTypeEnum.BENEFIT ? 'benefit' : option.type === MonthlySalaryAdjustmentTypeEnum.DEDUCTION ? 'deduction' : '')}`,
    //       })),
    //     ),
    //   )
    //   .subscribe((data) => this.monthlySalaryAdjustmentTypeOptions.set(data));
  }

  onSaveClick() {
    const data = {
      ...this.timeBasedSalaryAdjustment(),
      date: formatDateToISODate(this.timeBasedSalaryAdjustment().date!),
    };
    console.log(data);
    // const stream$ = data?.id
    //   ? this._employeeService.updateTimeBasedSalaryAdjustment(
    //       data.employee_id!,
    //       data,
    //     )
    //   : this._employeeService.addTimeBasedSalaryAdjustment(
    //       data.employee_id!,
    //       data,
    //     );

    // stream$.subscribe(() => this._ref.close(true));
  }
}
