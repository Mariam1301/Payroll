import { Component, inject, input, signal } from '@angular/core';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { UiDataElement } from '../../../../shared/components/responsive-data-view/data-element/data-element.component';
import { UiResponsiveDataViewComponent } from '../../../../shared/components/responsive-data-view/responsive-data-view.component';
import { EmployeeService } from '../../../../core/services/employee/employee.service';
import { DatePipe } from '@angular/common';
import { UiDialogService } from '../../../../core/services/dialog/dialog.service';
import {IncentiveBonus} from "../../../../core/models/incentive-bonus";
import {IncentiveBonusComponent} from "../../incentive-bonus/incentive-bonus.component";
import {UiTemplateDirective} from "../../../../shared/directives/template/ui-template.directive";

@Component({
  selector: 'employee-incentive-bonus-information',
  standalone: true,
  imports: [
    TranslocoDirective,
    UiDataElement,
    UiResponsiveDataViewComponent,
    DatePipe,
    UiTemplateDirective,
  ],
  templateUrl: './incentive-bonus-information.component.html',
})
export class IncentiveBonusInformationComponent {
  employeeId = input.required<number>();

  data = signal<Partial<IncentiveBonus>[]>([]);

  private _employeeService = inject(EmployeeService);
  private _dialogService = inject(UiDialogService);
  private _translocoService = inject(TranslocoService);

  ngOnInit(): void {
    this.fetch();
  }

  onAddClick() {
    this._dialogService
      .open(IncentiveBonusComponent, {
        header: this._translocoService.translate('incentiveBonus'),
        data: { incentiveBonus: null, employeeId: this.employeeId() },
      })
      .onClose.subscribe((data) => !!data && this.fetch());
  }

  onRowClick({ dataItem }: any) {
    this._dialogService
      .open(IncentiveBonusComponent, {
        header: this._translocoService.translate('incentiveBonus'),
        data: { incentiveBonus: dataItem, employeeId: this.employeeId() },
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
