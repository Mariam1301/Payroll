import { Component, computed, inject, signal } from '@angular/core';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { UiDataElement } from '../../shared/components/responsive-data-view/data-element/data-element.component';
import { UiResponsiveDataViewComponent } from '../../shared/components/responsive-data-view/responsive-data-view.component';
import { Router } from '@angular/router';
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
export class PayrollGenerationComponent {
  data = signal<Partial<PayrollCalculationResultModel>[]>([]);
  payrollGenerationModel = signal<PayrollGenerationModel | null>(null);
  router = inject(Router);

  private readonly _dialogService = inject(UiDialogService);
  private readonly _translocoService = inject(TranslocoService);
  private readonly _payrollService = inject(PayrollService);

  defaultSelectedColumns = [
    'name',
    'surname',
    'id_number',
    'salary_gross',
    'salary_net',
    'salary_pension',
    'salary_income_tax',
  ];

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
