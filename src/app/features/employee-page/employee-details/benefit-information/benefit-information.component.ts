import { Component, inject, input, signal } from '@angular/core';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { UiDataElement } from '../../../../shared/components/responsive-data-view/data-element/data-element.component';
import { UiResponsiveDataViewComponent } from '../../../../shared/components/responsive-data-view/responsive-data-view.component';
import { EmployeeService } from '../../../../core/services/employee/employee.service';
import { Benefit } from '../../../../core/models/benefit.model';
import { BenefitComponent } from '../../benefit/benefit.component';
import { DatePipe } from '@angular/common';
import { UiDialogService } from '../../../../core/services/dialog/dialog.service';

@Component({
  selector: 'employee-benefit-information',
  standalone: true,
  imports: [
    TranslocoDirective,
    UiDataElement,
    UiResponsiveDataViewComponent,
    DatePipe,
  ],
  templateUrl: './benefit-information.component.html',
})
export class BenefitInformationComponent {
  employeeId = input.required<number>();

  data = signal<Partial<Benefit>[]>([]);

  private _employeeService = inject(EmployeeService);
  private _dialogService = inject(UiDialogService);
  private _translocoService = inject(TranslocoService);

  ngOnInit(): void {
    this.fetch();
  }

  onAddClick() {
    this._dialogService
      .open(BenefitComponent, {
        header: this._translocoService.translate('monthlyBenefit'),
        data: { benefit: null, employeeId: this.employeeId() },
      })
      .onClose.subscribe((data) => !!data && this.fetch());
  }

  onRowClick({ dataItem }: any) {
    this._dialogService
      .open(BenefitComponent, {
        header: this._translocoService.translate('monthlyBenefit'),
        data: { benefit: dataItem, employeeId: this.employeeId() },
      })
      .onClose.subscribe((data) => !!data && this.fetch());
  }

  onDeleteClick({ dataItem }: any) {
    this._employeeService
      .deleteBenefit(this.employeeId(), dataItem.id)
      .subscribe(() => this.fetch());
  }

  fetch() {
    this._employeeService
      .getBenefits(this.employeeId())
      .subscribe((benefits) => this.data.set(benefits));
  }
}
