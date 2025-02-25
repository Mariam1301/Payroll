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
import { MonthlySalaryAdjustment } from '../../../core/models/monthly-salary-adjustment.model';
import { CurrencyEnum } from '../../../core/models/general.model';
import { AsyncPipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { MonthlySalaryAdjustmentsService } from '../../../core/services/monthly-salary-adjustments/monthly-salary-adjustments.service';
import { map } from 'rxjs';
import {
  MonthlySalaryAdjustmentType,
  MonthlySalaryAdjustmentTypeEnum,
} from '../../../core/models/monthly-salary-adjustment-type.model';
import { MonthlySalaryAdjustmentTypeComponent } from '../../company-page/monthly-salary-adjustment-type/montly-salary-adjustment-type.component';
import { CURRENCY_OPTIONS } from '../../../core/constants/general.constants';

@Component({
  selector: 'employee-monthly-adjustment',
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
  templateUrl: './monthly-salary-adjustment.component.html',
})
export class EmployeeMonthlySalaryAdjustmentComponent {
  monthlySalaryAdjustment = signal<Partial<MonthlySalaryAdjustment>>({});

  private readonly _ref = inject(DynamicDialogRef);
  private readonly _dialogConfig = inject(DynamicDialogConfig);
  private readonly _employeeService = inject(EmployeeService);
  private readonly _translocoService = inject(TranslocoService);
  private readonly _dialogService = inject(DialogService);
  private readonly _monthlySalaryAdjustmentsService = inject(
    MonthlySalaryAdjustmentsService,
  );

  currentMonthlyAdjustment = signal(true);

  now = new Date();

  monthlySalaryAdjustmentTypeOptions = signal<MonthlySalaryAdjustmentType[]>(
    [],
  );

  currencyOptions = CURRENCY_OPTIONS;

  ngOnInit(): void {
    this.getMonthlySalaryAdjustmentTypeOptions();
    const monthlySalaryAdjustment = {
      ...this._dialogConfig.data?.monthlySalaryAdjustment,
    };
    monthlySalaryAdjustment &&
      this.monthlySalaryAdjustment.set(monthlySalaryAdjustment);
    this.currentMonthlyAdjustment.set(!monthlySalaryAdjustment?.end_date);
  }

  onSaveClick() {
    const employeeId = this._dialogConfig.data?.employeeId;
    const data = {
      ...this.monthlySalaryAdjustment(),
      start_date: formatDateToISODate(
        this.monthlySalaryAdjustment().start_date!,
      ),
      end_date: formatDateToISODate(this.monthlySalaryAdjustment().end_date!),
    };
    const stream$ = data?.id
      ? this._employeeService.updateMonthlySalaryAdjustment(employeeId, data)
      : this._employeeService.addMonthlySalaryAdjustment(employeeId, data);
    stream$.subscribe(() => this._ref.close(true));
  }

  onCurrentMonthlyAdjustmentChange() {
    this.monthlySalaryAdjustment.update((prev) => ({
      ...prev,
      end_date: undefined,
    }));
  }

  onAddNewMonthlySalaryAdjustmentType() {
    this._dialogService
      .open(MonthlySalaryAdjustmentTypeComponent, {
        header: this._translocoService.translate('monthlySalaryAdjustmentType'),
        closable: true,
        data: { monthlySalaryAdjustmentType: null },
      })
      .onClose.subscribe((data) => {
        if (!!data) {
          this.getMonthlySalaryAdjustmentTypeOptions();
          this.monthlySalaryAdjustment.update((prev) => ({
            ...prev,
            monthly_salary_adjustment_id: data.id,
          }));
        }
      });
  }

  private getMonthlySalaryAdjustmentTypeOptions() {
    this._monthlySalaryAdjustmentsService
      .getAll()
      .pipe(
        map((options) =>
          options.map((option) => ({
            ...option,
            name: `${option.name} - ${this._translocoService.translate(option.type === MonthlySalaryAdjustmentTypeEnum.BENEFIT ? 'benefit' : option.type === MonthlySalaryAdjustmentTypeEnum.DEDUCTION ? 'deduction' : '')}`,
          })),
        ),
      )
      .subscribe((data) => this.monthlySalaryAdjustmentTypeOptions.set(data));
  }
}
