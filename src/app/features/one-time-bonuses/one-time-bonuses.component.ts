import { Component, inject, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { UiDataElement } from '../../shared/components/responsive-data-view/data-element/data-element.component';
import { UiResponsiveDataViewComponent } from '../../shared/components/responsive-data-view/responsive-data-view.component';
import { UiDialogService } from '../../core/services/dialog/dialog.service';
import { UiTemplateDirective } from '../../shared/directives/template/ui-template.directive';
import { OneTimeDeductionInfo } from '../../core/models/one-time-deduction.model';
import { OneTimeBonusesDialogComponent } from './one-time-bonuses-dialog/one-time-bonuses-dialog.component';
import { OneTimeBonusInfo } from '../../core/models/one-time-bonus.model';

@Component({
  selector: 'app-one-time-bonuses',
  standalone: true,
  imports: [
    DatePipe,
    TranslocoDirective,
    UiDataElement,
    UiResponsiveDataViewComponent,
    UiTemplateDirective,
  ],
  templateUrl: './one-time-bonuses.component.html',
})
export class OneTimeBonusesComponent implements OnInit {
  data = signal<Partial<OneTimeBonusInfo>[]>([]);

  // private _monthlyOvertimeService = inject(MonthlyOvertimesService);
  private _dialogService = inject(UiDialogService);
  private _translocoService = inject(TranslocoService);

  ngOnInit(): void {
    this.fetch();
  }

  onAddClick() {
    this._dialogService
      .open(OneTimeBonusesDialogComponent, {
        header: this._translocoService.translate('oneTimeBonus'),
        data: { oneTimeBonus: null },
      })
      .onClose.subscribe((data) => !!data && this.fetch());
  }

  onRowClick({ dataItem }: any) {
    this._dialogService
      .open(OneTimeBonusesDialogComponent, {
        header: this._translocoService.translate('oneTimeBonus'),
        data: { oneTimeBonus: dataItem },
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
        amount: 10,
        payment_currency: 'GEL',
        calculation_currency: 'GEL',
        includes_income_tax: true,
        includes_employee_pension: true,
        date_from: new Date('01-01-2025'),
        date_to: new Date('01-27-2025'),
      } as unknown as OneTimeDeductionInfo,
    ]);
    // this._monthlyOvertimeService
    //   .getAll()
    //   .subscribe((monthlyOvertimes) => this.data.set(monthlyOvertimes));
  }
}
