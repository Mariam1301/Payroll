import { Component, inject, input, signal } from '@angular/core';
import { EmployeeService } from '../../../../core/services/employee/employee.service';
import { DialogService } from 'primeng/dynamicdialog';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { Deduction } from '../../../../core/models/deduction.model';
import { DeductionComponent } from '../../deduction/deduction.component';
import { UiDataElement } from '../../../../shared/components/responsive-data-view/data-element/data-element.component';
import { UiResponsiveDataViewComponent } from '../../../../shared/components/responsive-data-view/responsive-data-view.component';
import { DatePipe } from '@angular/common';
import { UiDialogService } from '../../../../core/services/dialog/dialog.service';
import {UiTemplateDirective} from "../../../../shared/directives/template/ui-template.directive";

@Component({
  selector: 'employee-deduction-information',
  standalone: true,
  imports: [
    TranslocoDirective,
    UiDataElement,
    UiResponsiveDataViewComponent,
    DatePipe,
    UiTemplateDirective,
  ],
  templateUrl: './deduction-information.component.html',
})
export class DeductionInformationComponent {
  employeeId = input.required<number>();

  data = signal<Partial<Deduction>[]>([]);

  private _employeeService = inject(EmployeeService);
  private _dialogService = inject(UiDialogService);
  private _translocoService = inject(TranslocoService);

  ngOnInit(): void {
    this.fetch();
  }

  onAddClick() {
    this._dialogService
      .open(DeductionComponent, {
        header: this._translocoService.translate('monthlyDeduction'),
        data: { deduction: null, employeeId: this.employeeId() },
      })
      .onClose.subscribe((data) => !!data && this.fetch());
  }

  onRowClick({ dataItem }: any) {
    this._dialogService
      .open(DeductionComponent, {
        header: this._translocoService.translate('monthlyDeduction'),
        data: { deduction: dataItem, employeeId: this.employeeId() },
      })
      .onClose.subscribe((data) => !!data && this.fetch());
  }

  onDeleteClick({ dataItem }: any) {
    this._employeeService
      .deleteDeduction(this.employeeId(), dataItem.id)
      .subscribe(() => this.fetch());
  }

  fetch() {
    this._employeeService
      .getDeductions(this.employeeId())
      .subscribe((deductions) => this.data.set(deductions));
  }
}
