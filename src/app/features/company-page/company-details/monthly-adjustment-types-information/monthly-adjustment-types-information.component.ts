import { Component, inject, signal } from '@angular/core';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { UiDataElement } from '../../../../shared/components/responsive-data-view/data-element/data-element.component';
import { UiResponsiveDataViewComponent } from '../../../../shared/components/responsive-data-view/responsive-data-view.component';
import { UiDialogService } from '../../../../core/services/dialog/dialog.service';
import { MonthlySalaryAdjustmentTypeComponent } from '../../monthly-salary-adjustment-type/montly-salary-adjustment-type.component';
import {
  MonthlySalaryAdjustmentTypeEnum,
  MonthlySalaryAdjustmentType,
} from '../../../../core/models/monthly-salary-adjustment-type.model';
import { MonthlySalaryAdjustmentsService } from '../../../../core/services/monthly-salary-adjustments/monthly-salary-adjustments.service';
import { UiTemplateDirective } from '../../../../shared/directives/template/ui-template.directive';

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
  data = signal<Partial<MonthlySalaryAdjustmentType>[]>([]);

  private _monthlySalaryAdjustmentService = inject(
    MonthlySalaryAdjustmentsService,
  );
  private _dialogService = inject(UiDialogService);
  private _translocoService = inject(TranslocoService);

  monthlySalaryAdjustmentTypeEnum = MonthlySalaryAdjustmentTypeEnum;

  ngOnInit(): void {
    this.fetch();
  }

  onAddClick() {
    this._dialogService
      .open(MonthlySalaryAdjustmentTypeComponent, {
        header: this._translocoService.translate('monthlySalaryAdjustmentType'),
        data: { monthlySalaryAdjustmentType: null },
      })
      .onClose.subscribe((data) => !!data && this.fetch());
  }

  onRowClick({ dataItem }: any) {
    this._dialogService
      .open(MonthlySalaryAdjustmentTypeComponent, {
        header: this._translocoService.translate('monthlySalaryAdjustmentType'),
        data: { monthlySalaryAdjustmentType: dataItem },
      })
      .onClose.subscribe((data) => !!data && this.fetch());
  }

  onDeleteClick({ dataItem }: any) {
    this._monthlySalaryAdjustmentService
      .delete(dataItem.id)
      .subscribe(() => this.fetch());
  }

  fetch() {
    this._monthlySalaryAdjustmentService
      .getAll()
      .subscribe((monthlySalaryAdjustmentTypes) =>
        this.data.set(monthlySalaryAdjustmentTypes),
      );
  }
}
