import { Component, inject, signal } from '@angular/core';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { UiDataElement } from '../../../../shared/components/responsive-data-view/data-element/data-element.component';
import { UiResponsiveDataViewComponent } from '../../../../shared/components/responsive-data-view/responsive-data-view.component';
import { UiDialogService } from '../../../../core/services/dialog/dialog.service';
import { UiTemplateDirective } from '../../../../shared/directives/template/ui-template.directive';
import { AdjustmentTypeEnum } from '../../../../core/models/general.model';
import { TimeBasedSalaryAdjustmentType } from '../../../../core/models/time-based-salary-adjustment-type.model';
import { TimeBasedSalaryAdjustmentTypeComponent } from '../../time-based-salary-adjustment-type/time-based-salary-adjustment-type.component';

@Component({
  selector: 'app-time-based-adjustment-types-information',
  standalone: true,
  imports: [
    TranslocoDirective,
    UiDataElement,
    UiResponsiveDataViewComponent,
    UiTemplateDirective,
  ],
  templateUrl: './time-based-adjustment-types-information.component.html',
})
export class TimeBasedAdjustmentTypesInformationComponent {
  data = signal<Partial<TimeBasedSalaryAdjustmentType>[]>([]);

  // private _timeBasedSalaryAdjustmentService = inject(
  //   TimeBasedSalaryAdjustmentsService,
  // );
  private _dialogService = inject(UiDialogService);
  private _translocoService = inject(TranslocoService);

  adjustmentTypeEnum = AdjustmentTypeEnum;

  ngOnInit(): void {
    this.fetch();
  }

  onAddClick() {
    this._dialogService
      .open(TimeBasedSalaryAdjustmentTypeComponent, {
        header: this._translocoService.translate(
          'timeBasedSalaryAdjustmentType',
        ),
        data: { timeBasedSalaryAdjustmentType: null },
      })
      .onClose.subscribe((data) => !!data && this.fetch());
  }

  onRowClick({ dataItem }: any) {
    this._dialogService
      .open(TimeBasedSalaryAdjustmentTypeComponent, {
        header: this._translocoService.translate(
          'timeBasedSalaryAdjustmentType',
        ),
        data: { timeBasedSalaryAdjustmentType: dataItem },
      })
      .onClose.subscribe((data) => !!data && this.fetch());
  }

  onDeleteClick({ dataItem }: any) {
    // this._timeBasedSalaryAdjustmentService
    //   .delete(dataItem.id)
    //   .subscribe(() => this.fetch());
  }

  fetch() {
    // this._timeBasedSalaryAdjustmentService
    //   .getAll()
    //   .subscribe((timeBasedSalaryAdjustmentTypes) =>
    //     this.data.set(timeBasedSalaryAdjustmentTypes),
    //   );
  }
}
