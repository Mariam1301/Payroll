import { Component, inject, signal } from '@angular/core';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { UiDataElement } from '../../../../shared/components/responsive-data-view/data-element/data-element.component';
import { UiResponsiveDataViewComponent } from '../../../../shared/components/responsive-data-view/responsive-data-view.component';
import { UiDialogService } from '../../../../core/services/dialog/dialog.service';
import { IncentiveBonus } from '../../../../core/models/incentive-bonus';
import { IncentiveBonusComponent } from '../../incentive-bonus/incentive-bonus.component';
import { UiTemplateDirective } from '../../../../shared/directives/template/ui-template.directive';
import { CompanyService } from '../../../../core/services/company/company.service';

@Component({
  selector: 'app-incentive-bonus-information',
  standalone: true,
  imports: [
    TranslocoDirective,
    UiDataElement,
    UiResponsiveDataViewComponent,
    UiTemplateDirective,
  ],
  templateUrl: './incentive-bonus-types-information.component.html',
})
export class IncentiveBonusInformationComponent {
  // employeeId = input.required<number>();

  data = signal<Partial<IncentiveBonus>[]>([]);

  private _companyService = inject(CompanyService);
  private _dialogService = inject(UiDialogService);
  private _translocoService = inject(TranslocoService);

  ngOnInit(): void {
    this.fetch();
  }

  onAddClick() {
    this._dialogService
      .open(IncentiveBonusComponent, {
        header: this._translocoService.translate('incentiveBonusType'),
        data: { incentiveBonus: null },
      })
      .onClose.subscribe((data) => !!data && this.fetch());
  }

  onRowClick({ dataItem }: any) {
    this._dialogService
      .open(IncentiveBonusComponent, {
        header: this._translocoService.translate('incentiveBonusType'),
        data: { incentiveBonus: dataItem },
      })
      .onClose.subscribe((data) => !!data && this.fetch());
  }

  onDeleteClick({ dataItem }: any) {
    // this._employeeService
    //   .deleteIncentiveBonus(this.employeeId(), dataItem.id)
    //   .subscribe(() => this.fetch());
  }

  fetch() {
    // this._employeeService
    //   .getIncentiveBonus(this.employeeId())
    //   .subscribe((incentiveBonuces) => this.data.set(incentiveBonuces));
  }
}
