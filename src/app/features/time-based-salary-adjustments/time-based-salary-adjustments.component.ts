import { Component, inject, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { UiDataElement } from '../../shared/components/responsive-data-view/data-element/data-element.component';
import { UiResponsiveDataViewComponent } from '../../shared/components/responsive-data-view/responsive-data-view.component';
import { UiDialogService } from '../../core/services/dialog/dialog.service';
import { UiTemplateDirective } from '../../shared/directives/template/ui-template.directive';
import { AdjustmentTypeEnum } from '../../core/models/general.model';
import { EmployeeService } from '../../core/services/employee/employee.service';
import { TimeBasedSalaryAdjustment } from '../../core/models/time-based-salary-adjustment.model';
import { TimeBasedSalaryAdjustmentDialogComponent } from './time-based-salary-adjustments-dialog/time-based-salary-adjustments.component';

@Component({
  selector: 'app-time-based-salary-adjustment',
  standalone: true,
  imports: [
    DatePipe,
    TranslocoDirective,
    UiDataElement,
    UiResponsiveDataViewComponent,
    UiTemplateDirective,
  ],
  templateUrl: './time-based-salary-adjustments.component.html',
})
export class TimeBasedSalaryAdjustmentComponent implements OnInit {
  data = signal<Partial<TimeBasedSalaryAdjustment>[]>([]);
  adjustmentType = AdjustmentTypeEnum;

  // private _monthlyOvertimeService = inject(MonthlyOvertimesService);
  private _dialogService = inject(UiDialogService);
  private _translocoService = inject(TranslocoService);
  // private _oneTimeSalaryAdjustmentService = inject(
  //   TimeBasedSalaryAdjustmentsService,
  // );
  private _employeeService = inject(EmployeeService);

  ngOnInit(): void {
    this.fetch();
  }

  onAddClick() {
    this._dialogService
      .open(TimeBasedSalaryAdjustmentDialogComponent, {
        header: this._translocoService.translate('oneTimeSalaryAdjustment'),
        data: { oneTimeSalaryAdjustment: null },
      })
      .onClose.subscribe((data) => !!data && this.fetch());
  }

  onRowClick({ dataItem }: { dataItem: TimeBasedSalaryAdjustment }) {
    this._dialogService
      .open(TimeBasedSalaryAdjustmentDialogComponent, {
        header: this._translocoService.translate('oneTimeSalaryAdjustment'),
        data: { oneTimeSalaryAdjustment: dataItem },
      })
      .onClose.subscribe((data) => !!data && this.fetch());
  }

  onDeleteClick({ dataItem }: { dataItem: TimeBasedSalaryAdjustment }) {
    // this._employeeService
    //   .deleteTimeBasedSalaryAdjustment(dataItem.employee_id, dataItem.id)
    //   .subscribe(() => this.fetch());
  }

  fetch() {
    // this._oneTimeSalaryAdjustmentService
    //   .getAll()
    //   .subscribe((data) => this.data.set(data));
  }
}
