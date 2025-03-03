import { Component, inject, OnInit, signal } from '@angular/core';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { UiDataElement } from '../../shared/components/responsive-data-view/data-element/data-element.component';
import { UiResponsiveDataViewComponent } from '../../shared/components/responsive-data-view/responsive-data-view.component';
import { UiDialogService } from '../../core/services/dialog/dialog.service';
import { CommonModule, DatePipe } from '@angular/common';
import { PayrollService } from '../../core/services/payroll/payroll.service';
import {
  PayrollCalculationResultModel,
  PayrollGeneralInformationFieldName,
  PayrollGeneralInformationValueField,
  PayrollGenerationModel,
  PayrollSalaryFieldName,
  PayrollSalaryValueField,
} from '../../core/models/payroll-generation.model';
import { UiTemplateDirective } from '../../shared/directives/template/ui-template.directive';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { ChipModule } from 'primeng/chip';
import { MonthlySalaryAdjustmentsService } from '../../core/services/monthly-salary-adjustments/monthly-salary-adjustments.service';
import { PayrollFieldsComponent } from './payroll-fields/payroll-fields.component';
import { TreeNode } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { PayrollGenerationConfigComponent } from './payroll-generation-config/payroll-generation.component';
import { UiSideBarLayoutComponent } from '../../shared/components/side-bar-layout/side-bar-layout.component';

@Component({
  selector: 'app-payroll-generation',
  standalone: true,
  imports: [
    TranslocoDirective,
    UiDataElement,
    UiResponsiveDataViewComponent,
    DatePipe,
    CommonModule,
    UiTemplateDirective,
    MultiSelectModule,
    FormsModule,
    ChipModule,
    PayrollGenerationConfigComponent,
    PayrollFieldsComponent,
    ButtonModule,
    UiSideBarLayoutComponent,
  ],
  templateUrl: './payroll-generation.component.html',
})
export class PayrollGenerationComponent implements OnInit {
  data = signal<Partial<PayrollCalculationResultModel>[]>([]);
  payrollGenerationModel = signal<PayrollGenerationModel | null>(null);
  dynamicFields = signal<{ name: string; valueField: string }[] | null>(null);

  selectedColumns = signal<string[]>([]);

  isGenerationDisabled = signal(false);
  private readonly _payrollService = inject(PayrollService);
  private readonly _monthlySalaryAdjustmentService = inject(
    MonthlySalaryAdjustmentsService,
  );

  PayrollGeneralInformationFieldName = PayrollGeneralInformationFieldName;
  PayrollGeneralInformationValueField = PayrollGeneralInformationValueField;
  PayrollSalaryFieldName = PayrollSalaryFieldName;
  PayrollSalaryValueField = PayrollSalaryValueField;

  defaultSelectedColumns = [
    PayrollGeneralInformationValueField.NAME,
    PayrollGeneralInformationValueField.LAST_NAME,
    PayrollGeneralInformationValueField.PERSONAL_NUMBER,
    PayrollSalaryValueField.GROSS_SALARY,
    PayrollSalaryValueField.NET_SALARY,
    PayrollSalaryValueField.PENSION_CONTRIBUTION,
    PayrollSalaryValueField.INCOME_TAX_CONTRIBUTION,
  ];

  ngOnInit(): void {
    this._monthlySalaryAdjustmentService.getAll().subscribe((data) =>
      this.dynamicFields.set(
        data.map((monthlyAdjustmentType) => ({
          name: monthlyAdjustmentType.name,
          valueField: `${monthlyAdjustmentType.name.split(' ').join('_')}_gross`,
        })),
      ),
    );
  }

  onGeneratePayrollClick(data: Partial<PayrollGenerationModel>) {
    this._payrollService
      .calculatePayroll(data as PayrollGenerationModel)
      .subscribe((payrollData) => {
        !!payrollData && this.data.set(payrollData);
        this.isGenerationDisabled.set(true);
      });
  }

  onFieldSelect(fields: TreeNode<{ valueField: string }>[]) {
    console.log(fields);
    const selectedFieldsValueFields = fields.map(
      ({ data }) => data?.valueField!,
    );
    this.selectedColumns.set(selectedFieldsValueFields);
  }
}
