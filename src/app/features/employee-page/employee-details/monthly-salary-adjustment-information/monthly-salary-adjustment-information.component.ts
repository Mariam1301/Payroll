import { Component, inject, input, signal } from '@angular/core';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { UiDataElement } from '../../../../shared/components/responsive-data-view/data-element/data-element.component';
import { UiResponsiveDataViewComponent } from '../../../../shared/components/responsive-data-view/responsive-data-view.component';
import { EmployeeService } from '../../../../core/services/employee/employee.service';
import { EmployeeMonthlySalaryAdjustmentComponent } from '../../monthly-salary-adjustment/monthly-salary-adjustment.component';
import { DatePipe } from '@angular/common';
import { UiDialogService } from '../../../../core/services/dialog/dialog.service';
import { UiTemplateDirective } from '../../../../shared/directives/template/ui-template.directive';
import { MonthlySalaryAdjustment } from '../../../../core/models/monthly-salary-adjustment.model';

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
  templateUrl: './monthly-salary-adjustment-information.component.html',
})
export class MonthlySalaryAdjustmentsInformationComponent {
  employeeId = input.required<number>();

  data = signal<Partial<MonthlySalaryAdjustment>[]>([]);

  private _employeeService = inject(EmployeeService);
  private _dialogService = inject(UiDialogService);
  private _translocoService = inject(TranslocoService);

  ngOnInit(): void {
    this.fetch();
  }

  onAddClick() {
    this._dialogService
      .open(EmployeeMonthlySalaryAdjustmentComponent, {
        header: this._translocoService.translate('monthlySalaryAdjustment'),
        data: { monthlySalaryAdjustment: null, employeeId: this.employeeId() },
      })
      .onClose.subscribe((data) => !!data && this.fetch());
  }

  onRowClick({ dataItem }: any) {
    this._dialogService
      .open(EmployeeMonthlySalaryAdjustmentComponent, {
        header: this._translocoService.translate('monthlySalaryAdjustment'),
        data: {
          monthlySalaryAdjustment: dataItem,
          employeeId: this.employeeId(),
        },
      })
      .onClose.subscribe((data) => !!data && this.fetch());
  }

  onDeleteClick({ dataItem }: any) {
    this._employeeService
      .deleteMonthlySalaryAdjustment(this.employeeId(), dataItem.id)
      .subscribe(() => this.fetch());
  }

  fetch() {
    this._employeeService
      .getMonthlySalaryAdjustments(this.employeeId())
      .subscribe((monthlySalaryAdjustments) =>
        this.data.set(monthlySalaryAdjustments),
      );
  }
}
