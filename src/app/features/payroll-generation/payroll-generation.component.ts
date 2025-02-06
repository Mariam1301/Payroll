import { Component, computed, inject, signal } from '@angular/core';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { UiDataElement } from '../../shared/components/responsive-data-view/data-element/data-element.component';
import { UiResponsiveDataViewComponent } from '../../shared/components/responsive-data-view/responsive-data-view.component';
import { Router } from '@angular/router';
import { UiDialogService } from '../../core/services/dialog/dialog.service';
import { PayrollGenerationDialogComponent } from './payroll-generation-dialog/payroll-generation-dialog.component';
import { CommonModule, DatePipe, JsonPipe } from '@angular/common';
import { PayrollService } from '../../core/services/payroll/payroll.service';
import { EMPTY, switchMap } from 'rxjs';
import {
  PayrollCalculationFieldsEnum,
  PayrollCalculationResultModel,
} from '../../core/models/payroll-generation.model';
import { UiTemplateDirective } from '../../shared/directives/template/ui-template.directive';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { UiFormFieldComponent } from '../../shared/components/form-field/form-field.component';
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
    UiFormFieldComponent,
    JsonPipe,
    ChipModule,
  ],
  templateUrl: './payroll-generation.component.html',
})
export class PayrollGenerationComponent {
  data = signal<Partial<PayrollCalculationResultModel>[]>([]);
  router = inject(Router);

  private readonly _dialogService = inject(UiDialogService);
  private readonly _translocoService = inject(TranslocoService);
  private readonly _payrollService = inject(PayrollService);

  selectedPayrollCalculationFields = signal<PayrollCalculationFieldsEnum[]>([]);

  PayrollCalculationFieldsEnum = PayrollCalculationFieldsEnum;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // this._payrollService
    //   .calculatePayroll({
    //     start_date: '2025-02-01',
    //     end_date: '2025-02-05',
    //     employee_ids: [1],
    //   })
    //   .subscribe((data) => this.data.set(data));
  }

  payrollCalculationFieldsDropdownValues = Object.keys(
    PayrollCalculationFieldsEnum,
  ).map((key) => ({
    name: key
      .toLowerCase()
      .replace(/_([a-z])/g, (_, letter) => letter.toUpperCase()),
    value:
      PayrollCalculationFieldsEnum[
        key as keyof typeof PayrollCalculationFieldsEnum
      ],
  }));

  onGeneratePayrollClick() {
    this._dialogService
      .open(PayrollGenerationDialogComponent, {
        header: this._translocoService.translate('employee'),
      })
      .onClose.pipe(
        switchMap((data) =>
          !!data ? this._payrollService.calculatePayroll(data) : EMPTY,
        ),
      )
      .subscribe((data) => !!data && this.data.set(data));
  }

  isFieldSelected(fieldEnum: PayrollCalculationFieldsEnum) {
    console.log(this.selectedPayrollCalculationFields().includes(fieldEnum));
    return this.selectedPayrollCalculationFields().includes(fieldEnum);
  }
}
