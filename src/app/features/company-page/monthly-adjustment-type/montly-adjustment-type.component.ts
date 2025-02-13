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
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CompanyService } from '../../../core/services/company/company.service';
import {
  MonthlyAdjustmentType,
  MonthlyAdjustmentTypeEnum,
} from '../../../core/models/monthly-adjustment-type.model';

@Component({
  selector: 'app-monthly-adjustment-type',
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
  ],
  templateUrl: './monthly-adjustment-type.component.html',
})
export class MonthlyAdjustmentTypeComponent {
  monthlyAdjustmentType = signal<Partial<MonthlyAdjustmentType>>({});

  private readonly _ref = inject(DynamicDialogRef);
  private readonly _dialogConfig = inject(DynamicDialogConfig);
  private readonly _companyService = inject(CompanyService);
  private readonly _translocoService = inject(TranslocoService);

  monthlyAdjustmentTypeOptions = signal<
    { id: MonthlyAdjustmentTypeEnum; label: string }[]
  >([
    {
      id: MonthlyAdjustmentTypeEnum.BENEFIT,
      label: this._translocoService.translate('benefit'),
    },
    {
      id: MonthlyAdjustmentTypeEnum.DEDUCTION,
      label: this._translocoService.translate('deduction'),
    },
  ]);

  ngOnInit(): void {
    // const benefit = { ...this._dialogConfig.data?.benefit };
    // benefit && this.benefitType.set(benefit);
    // this.currentBenefit.set(!benefit?.end_date);
  }

  onSaveClick() {
    // const employeeId = this._dialogConfig.data?.employeeId;
    // const data = {
    //   ...this.benefitType(),
    //   start_date: formatDateToISODate(this.benefitType().start_date!),
    //   end_date: formatDateToISODate(this.benefitType().end_date!),
    // };
    // const stream$ = data?.id
    //   ? this._employeeService.updateBenefit(employeeId, data)
    //   : this._employeeService.addBenefit(employeeId, data);
    // stream$.subscribe(() => this._ref.close(true));
  }
}
