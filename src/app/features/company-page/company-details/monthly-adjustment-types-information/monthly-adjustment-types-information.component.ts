import { Component, inject, signal } from '@angular/core';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { UiDataElement } from '../../../../shared/components/responsive-data-view/data-element/data-element.component';
import { UiResponsiveDataViewComponent } from '../../../../shared/components/responsive-data-view/responsive-data-view.component';
import { UiDialogService } from '../../../../core/services/dialog/dialog.service';
import { UiTemplateDirective } from '../../../../shared/directives/template/ui-template.directive';
import { CompanyService } from '../../../../core/services/company/company.service';
import { MonthlyAdjustmentTypeComponent } from '../../monthly-adjustment-type/montly-adjustment-type.component';
import { MonthlyAdjustmentType } from '../../../../core/models/monthly-adjustment-type.model';

@Component({
  selector: 'app-monthly-adjustment-types-information',
  standalone: true,
  imports: [
    TranslocoDirective,
    UiDataElement,
    UiResponsiveDataViewComponent,
    UiTemplateDirective,
  ],
  templateUrl: './monthly-adjustment-types-information.component.html',
})
export class MonthlyAdjustmentTypesInformationComponent {
  data = signal<Partial<MonthlyAdjustmentType>[]>([]);

  private _companyService = inject(CompanyService);
  private _dialogService = inject(UiDialogService);
  private _translocoService = inject(TranslocoService);

  ngOnInit(): void {
    this.fetch();
  }

  onAddClick() {
    this._dialogService
      .open(MonthlyAdjustmentTypeComponent, {
        header: this._translocoService.translate('monthlyAdjustmentType'),
        data: { benefit: null },
      })
      .onClose.subscribe((data) => !!data && this.fetch());
  }

  onRowClick({ dataItem }: any) {
    this._dialogService
      .open(MonthlyAdjustmentTypeComponent, {
        header: this._translocoService.translate('monthlyAdjustmentType'),
        data: { benefit: dataItem },
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
