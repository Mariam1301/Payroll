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

@Component({
  selector: 'app-monthly-adjustment-type',
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
  ],
  templateUrl: './monthly-salary-adjustment-type.component.html',
})
export class MonthlySalaryAdjustmentTypeComponent {
  monthlySalaryAdjustmentType = signal<Partial<MonthlySalaryAdjustmentType>>(
    {},
  );

  private readonly _ref = inject(DynamicDialogRef);
  private readonly _dialogConfig = inject(DynamicDialogConfig);
  private readonly _monthlySalaryAdjustmentService = inject(
    MonthlySalaryAdjustmentsService,
  );
  private readonly _translocoService = inject(TranslocoService);

  monthlySalaryAdjustmentTypeOptions = signal<
    { id: MonthlySalaryAdjustmentTypeEnum; label: string }[]
  >([
    {
      id: MonthlySalaryAdjustmentTypeEnum.BENEFIT,
      label: this._translocoService.translate('benefit'),
    },
    {
      id: MonthlySalaryAdjustmentTypeEnum.DEDUCTION,
      label: this._translocoService.translate('deduction'),
    },
  ]);

  ngOnInit(): void {
    const monthlySalaryAdjustmentType = {
      ...this._dialogConfig.data?.monthlySalaryAdjustmentType,
    };
    monthlySalaryAdjustmentType &&
      this.monthlySalaryAdjustmentType.set(monthlySalaryAdjustmentType);
  }

  onSaveClick() {
    const data = {
      ...this.monthlySalaryAdjustmentType(),
    };

    const stream$ = data?.id
      ? this._monthlySalaryAdjustmentService.update(data)
      : this._monthlySalaryAdjustmentService.add(data);
    stream$.subscribe((data) => this._ref.close(data));
  }
}
