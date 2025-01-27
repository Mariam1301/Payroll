import {Component, inject, OnInit, signal} from '@angular/core';
import { DatePipe } from '@angular/common';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { UiDataElement } from '../../shared/components/responsive-data-view/data-element/data-element.component';
import { UiResponsiveDataViewComponent } from '../../shared/components/responsive-data-view/responsive-data-view.component';
import { UiDialogService } from '../../core/services/dialog/dialog.service';
import { MonthlyOvertimeInformation } from '../../core/models/monthly-overtime.model';
import { UiTemplateDirective } from '../../shared/directives/template/ui-template.directive';
import {PercentageBonusesDialogComponent} from "./percentage-bonuses/percentage-bonuses-dialog.component";
import {PercentageBonusInfo} from "../../core/models/percentage-bonus.model";

@Component({
  selector: 'app-percentage-bonuses',
  standalone: true,
  imports: [
    DatePipe,
    TranslocoDirective,
    UiDataElement,
    UiResponsiveDataViewComponent,
    UiTemplateDirective,
  ],
  templateUrl: './percentage-bonuses.component.html',
})
export class PercentageBonucsesComponent implements OnInit {
  data = signal<Partial<PercentageBonusInfo>[]>([]);

  // private _monthlyOvertimeService = inject(MonthlyOvertimesService);
  private _dialogService = inject(UiDialogService);
  private _translocoService = inject(TranslocoService);

  ngOnInit(): void {
    this.fetch();
  }

  onAddClick() {
    this._dialogService
      .open(PercentageBonusesDialogComponent, {
        header: this._translocoService.translate('percentageBonus'),
        data: { percentageBonus: null },
      })
      .onClose.subscribe((data) => !!data && this.fetch());
  }

  onRowClick({ dataItem }: any) {
    this._dialogService
      .open(PercentageBonusesDialogComponent, {
        header: this._translocoService.translate('percentageBonus'),
        data: { percentageBonus: dataItem },
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
        incentive_bonus_type: 'Weekend',
        amount: 10,
        date_from: new Date('01-01-2025'),
        date_to: new Date('01-27-2025'),
      } as unknown as MonthlyOvertimeInformation,
    ]);
    // this._monthlyOvertimeService
    //   .getAll()
    //   .subscribe((monthlyOvertimes) => this.data.set(monthlyOvertimes));
  }
}
