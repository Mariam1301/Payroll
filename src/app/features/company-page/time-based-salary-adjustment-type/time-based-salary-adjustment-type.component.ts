import { Component, inject, signal } from '@angular/core';
import { CheckboxModule } from 'primeng/checkbox';
import { Select } from 'primeng/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { UiDialogActionsComponent } from '../../../shared/components/dialog-actions/dialog-actions.component';
import { UiFormFieldComponent } from '../../../shared/components/form-field/form-field.component';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import {
  MonthlySalaryAdjustmentType,
  MonthlySalaryAdjustmentTypeEnum,
} from '../../../core/models/monthly-salary-adjustment-type.model';
import { MonthlySalaryAdjustmentsService } from '../../../core/services/monthly-salary-adjustments/monthly-salary-adjustments.service';
import { TimeBasedSalaryAdjustmentType } from '../../../core/models/time-based-salary-adjustment-type.model';
import { ADJUSTMENT_TYPES } from '../../../core/constants/general.constants';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-time-based-adjustment-type',
  standalone: true,
  imports: [
    CheckboxModule,
    Select,
    FormsModule,
    InputTextModule,
    ReactiveFormsModule,
    TranslocoDirective,
    UiDialogActionsComponent,
    UiFormFieldComponent,
    InputNumberModule,
  ],
  templateUrl: './time-based-salary-adjustment-type.component.html',
})
export class TimeBasedSalaryAdjustmentTypeComponent {
  timeBasedSalaryAdjustmentType = signal<
    Partial<TimeBasedSalaryAdjustmentType>
  >({});

  private readonly _ref = inject(DynamicDialogRef);
  private readonly _dialogConfig = inject(DynamicDialogConfig);
  // private readonly _monthlySalaryAdjustmentService = inject(
  //   MonthlySalaryAdjustmentsService,
  // );
  private readonly _translocoService = inject(TranslocoService);

  timeBasedSalaryAdjustmentTypeOptions = ADJUSTMENT_TYPES.map((option) => ({
    ...option,
    label: this._translocoService.translate(option.label),
  }));
  ngOnInit(): void {
    const timeBasedSalaryAdjustmentType = {
      ...this._dialogConfig.data?.timeBasedSalaryAdjustmentType,
    };
    timeBasedSalaryAdjustmentType &&
      this.timeBasedSalaryAdjustmentType.set(timeBasedSalaryAdjustmentType);
  }

  onSaveClick() {
    const data = {
      ...this.timeBasedSalaryAdjustmentType(),
    };

    console.log(data);
    // const stream$ = data?.id
    //   ? this._monthlySalaryAdjustmentService.update(data)
    //   : this._monthlySalaryAdjustmentService.add(data);
    // stream$.subscribe((data) => this._ref.close(data));
  }
}
