import { Component, inject, input, signal } from '@angular/core';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { UiDataElement } from '../../../../shared/components/responsive-data-view/data-element/data-element.component';
import { UiResponsiveDataViewComponent } from '../../../../shared/components/responsive-data-view/responsive-data-view.component';
import { EmployeeService } from '../../../../core/services/employee/employee.service';
import { EmployeeMonthlyAdjustmentComponent } from '../../monthly-adjustment/monthly-adjustment.component';
import { DatePipe } from '@angular/common';
import { UiDialogService } from '../../../../core/services/dialog/dialog.service';
import { UiTemplateDirective } from '../../../../shared/directives/template/ui-template.directive';
import { MonthlyAdjustment } from '../../../../core/models/monthly-adjustment.model';

@Component({
  selector: 'employee-monthly-adjustment-information',
  standalone: true,
  imports: [
    TranslocoDirective,
    UiDataElement,
    UiResponsiveDataViewComponent,
    DatePipe,
    UiTemplateDirective,
  ],
  templateUrl: './monthly-adjustment-information.component.html',
})
export class MonthlyAdjustmentsInformationComponent {
  employeeId = input.required<number>();

  data = signal<Partial<MonthlyAdjustment>[]>([]);

  private _employeeService = inject(EmployeeService);
  private _dialogService = inject(UiDialogService);
  private _translocoService = inject(TranslocoService);

  ngOnInit(): void {
    this.fetch();
  }

  onAddClick() {
    this._dialogService
      .open(EmployeeMonthlyAdjustmentComponent, {
        header: this._translocoService.translate('monthlyAdjustment'),
        data: { monthlyAdjustment: null, employeeId: this.employeeId() },
      })
      .onClose.subscribe((data) => !!data && this.fetch());
  }

  onRowClick({ dataItem }: any) {
    this._dialogService
      .open(EmployeeMonthlyAdjustmentComponent, {
        header: this._translocoService.translate('monthlyAdjustment'),
        data: { monthlyAdjustment: dataItem, employeeId: this.employeeId() },
      })
      .onClose.subscribe((data) => !!data && this.fetch());
  }

  onDeleteClick({ dataItem }: any) {
    // this._employeeService
    //   .deleteBenefit(this.employeeId(), dataItem.id)
    //   .subscribe(() => this.fetch());
  }

  fetch() {
    // this._employeeService
    //   .getBenefits(this.employeeId())
    //   .subscribe((benefits) => this.data.set(benefits));
  }
}
