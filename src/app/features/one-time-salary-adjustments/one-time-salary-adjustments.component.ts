import { Component, inject, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { UiDataElement } from '../../shared/components/responsive-data-view/data-element/data-element.component';
import { UiResponsiveDataViewComponent } from '../../shared/components/responsive-data-view/responsive-data-view.component';
import { UiDialogService } from '../../core/services/dialog/dialog.service';
import { UiTemplateDirective } from '../../shared/directives/template/ui-template.directive';
import { OneTimeDeductionInfo } from '../../core/models/one-time-deduction.model';
import { OneTimeSalaryAdjustment } from '../../core/models/one-time-salary-adjustment.model';
import { OneTimeSalaryAdjustmentDialogComponent } from './one-time-salary-adjustment-dialog/one-time-salary-adjusmtent-dialog.component';
import { AdjustmentTypeEnum } from '../../core/models/general.model';
import { OneTimeSalaryAdjustmentsService } from '../../core/services/one-time-salary-adjusments/one-time-salary-adjustments.service';
import { EmployeeService } from '../../core/services/employee/employee.service';

@Component({
  selector: 'app-one-time-salary-adjustment',
  standalone: true,
  imports: [
    DatePipe,
    TranslocoDirective,
    UiDataElement,
    UiResponsiveDataViewComponent,
    UiTemplateDirective,
  ],
  templateUrl: './one-time-salary-adjusmtents.component.html',
})
export class OneTimeSalaryAdjustmentComponent implements OnInit {
  data = signal<Partial<OneTimeSalaryAdjustment>[]>([]);
  adjustmentType = AdjustmentTypeEnum;

  // private _monthlyOvertimeService = inject(MonthlyOvertimesService);
  private _dialogService = inject(UiDialogService);
  private _translocoService = inject(TranslocoService);
  private _oneTimeSalaryAdjustmentService = inject(
    OneTimeSalaryAdjustmentsService,
  );
  private _employeeService = inject(EmployeeService);

  ngOnInit(): void {
    this.fetch();
  }

  onAddClick() {
    this._dialogService
      .open(OneTimeSalaryAdjustmentDialogComponent, {
        header: this._translocoService.translate('oneTimeSalaryAdjustment'),
        data: { oneTimeSalaryAdjustment: null },
      })
      .onClose.subscribe((data) => !!data && this.fetch());
  }

  onRowClick({ dataItem }: { dataItem: OneTimeSalaryAdjustment }) {
    this._dialogService
      .open(OneTimeSalaryAdjustmentDialogComponent, {
        header: this._translocoService.translate('oneTimeSalaryAdjustment'),
        data: { oneTimeSalaryAdjustment: dataItem },
      })
      .onClose.subscribe((data) => !!data && this.fetch());
  }

  onDeleteClick({ dataItem }: { dataItem: OneTimeSalaryAdjustment }) {
    this._employeeService
      .deleteOneTimeSalaryAdjustment(dataItem.employee_id, dataItem.id)
      .subscribe(() => this.fetch());
  }

  fetch() {
    this._oneTimeSalaryAdjustmentService
      .getAll()
      .subscribe((data) => this.data.set(data));
  }
}
