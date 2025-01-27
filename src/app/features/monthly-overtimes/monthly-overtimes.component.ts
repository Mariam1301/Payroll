import { Component, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { UiDataElement } from '../../shared/components/responsive-data-view/data-element/data-element.component';
import { UiResponsiveDataViewComponent } from '../../shared/components/responsive-data-view/responsive-data-view.component';
import { UiDialogService } from '../../core/services/dialog/dialog.service';
import { MonthlyOvertimeInformation } from '../../core/models/monthly-overtime.model';
import { MonthlyOvertimesService } from '../../core/services/monthly-overtimes/monthly-overtimes.service';
import { MonthlyOvertimesDialogComponent } from './monthly-overtimes-dialog/monthly-overtimes-dialog.component';
import { UiTemplateDirective } from '../../shared/directives/template/ui-template.directive';

@Component({
  selector: 'app-monthly-overtimes',
  standalone: true,
  imports: [
    DatePipe,
    TranslocoDirective,
    UiDataElement,
    UiResponsiveDataViewComponent,
    UiTemplateDirective,
  ],
  templateUrl: './monthly-overtimes.component.html',
})
export class MonthlyOvertimesComponent {
  data = signal<Partial<MonthlyOvertimeInformation>[]>([]);

  private _monthlyOvertimeService = inject(MonthlyOvertimesService);
  private _dialogService = inject(UiDialogService);
  private _translocoService = inject(TranslocoService);

  ngOnInit(): void {
    this.fetch();
  }

  onAddClick() {
    this._dialogService
      .open(MonthlyOvertimesDialogComponent, {
        header: this._translocoService.translate('overtimes'),
        data: { monthlyOvertime: null },
      })
      .onClose.subscribe((data) => !!data && this.fetch());
  }

  onRowClick({ dataItem }: any) {
    this._dialogService
      .open(MonthlyOvertimesDialogComponent, {
        header: this._translocoService.translate('overtime'),
        data: { monthlyOvertime: dataItem },
      })
      .onClose.subscribe((data) => !!data && this.fetch());
  }

  onDeleteClick({ dataItem }: any) {
    // this._monthlyOvertimeService
    //   .delete( dataItem.id)
    //   .subscribe(() => this.fetch());
  }

  fetch() {
    this.data.set([
      {
        employee: 'Mariam Khachvani',
        overtime_type: 'Weekend',
        overtime_hours_worked: 10,
        date_from: new Date('01-01-2025'),
        date_to: new Date('01-27-2025'),
      } as unknown as MonthlyOvertimeInformation,
    ]);
    // this._monthlyOvertimeService
    //   .getAll()
    //   .subscribe((monthlyOvertimes) => this.data.set(monthlyOvertimes));
  }
}
