import { Component, inject, OnInit, signal } from '@angular/core';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { UiDataElement } from '../../shared/components/responsive-data-view/data-element/data-element.component';
import { UiResponsiveDataViewComponent } from '../../shared/components/responsive-data-view/responsive-data-view.component';
import { UiDialogService } from '../../core/services/dialog/dialog.service';
import { PayrollGenerationDialogComponent } from './payroll-generation-dialog/payroll-generation-dialog.component';
import { CommonModule, DatePipe } from '@angular/common';
import { PayrollService } from '../../core/services/payroll/payroll.service';
import { EMPTY, switchMap, tap } from 'rxjs';
import {
  PayrollCalculationResultModel,
  PayrollGenerationModel,
} from '../../core/models/payroll-generation.model';
import { UiTemplateDirective } from '../../shared/directives/template/ui-template.directive';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { ChipModule } from 'primeng/chip';
import { MonthlySalaryAdjustmentsService } from '../../core/services/monthly-salary-adjustments/monthly-salary-adjustments.service';

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
  ],
  templateUrl: './payroll-generation.component.html',
})
export class PayrollGenerationComponent implements OnInit {
  data = signal<Partial<PayrollCalculationResultModel>[]>([]);
  payrollGenerationModel = signal<PayrollGenerationModel | null>(null);
  dynamicFields = signal<{ name: string; valueField: string }[] | null>(null);

  private readonly _dialogService = inject(UiDialogService);
  private readonly _translocoService = inject(TranslocoService);
  private readonly _payrollService = inject(PayrollService);
  private readonly _monthlySalaryAdjustmentService = inject(
    MonthlySalaryAdjustmentsService,
  );

  defaultSelectedColumns = [
    'name',
    'surname',
    'id_number',
    'salary_gross',
    'salary_net',
    'salary_pension',
    'salary_income_tax',
  ];

  ngOnInit(): void {
    this._monthlySalaryAdjustmentService.getAll().subscribe((data) =>
      this.dynamicFields.set(
        data.map((monthlyAdjustmentType) => ({
          name: monthlyAdjustmentType.name,
          valueField: `${monthlyAdjustmentType.name}_gross`,
        })),
      ),
    );
  }

  onGeneratePayrollClick() {
    this._dialogService
      .open(PayrollGenerationDialogComponent, {
        header: this._translocoService.translate('employee'),
      })
      .onClose.pipe(
        tap((data: PayrollGenerationModel) =>
          this.payrollGenerationModel.set(data),
        ),
        switchMap((data) =>
          !!data ? this._payrollService.calculatePayroll(data) : EMPTY,
        ),
      )
      .subscribe((data) => !!data && this.data.set(data));
  }
}
