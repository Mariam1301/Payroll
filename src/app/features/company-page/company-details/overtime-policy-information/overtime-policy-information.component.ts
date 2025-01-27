import { Component, inject, input, OnInit, signal } from '@angular/core';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { UiDataElement } from '../../../../shared/components/responsive-data-view/data-element/data-element.component';
import { UiResponsiveDataViewComponent } from '../../../../shared/components/responsive-data-view/responsive-data-view.component';
import { UiDialogService } from '../../../../core/services/dialog/dialog.service';
import { OvertimePolicy } from '../../../../core/models/ovetime-policy.model';
import { OvertimePolicyComponent } from '../../overtime-policy/overtime-policy.component';

@Component({
  selector: 'company-overtime-policy-information',
  standalone: true,
  imports: [TranslocoDirective, UiDataElement, UiResponsiveDataViewComponent],
  templateUrl: './overtime-policy-information.component.html',
})
export class OvertimePolicyInformationComponent implements OnInit {
  companyId = input<number>();

  data = signal<Partial<OvertimePolicy>[]>([]);

  // private _companyService = inject(CompanyService);
  private _dialogService = inject(UiDialogService);
  private _translocoService = inject(TranslocoService);

  ngOnInit(): void {
    this.fetch();
  }

  onAddClick() {
    this._dialogService
      .open(OvertimePolicyComponent, {
        header: this._translocoService.translate('overtimePolicy'),
        data: { overtimePolicy: null, companyId: this.companyId() },
      })
      .onClose.subscribe((data) => !!data && this.fetch());
  }

  onRowClick({ dataItem }: any) {
    this._dialogService
      .open(OvertimePolicyComponent, {
        header: this._translocoService.translate('overtimePolicy'),
        data: { overtimePolicy: dataItem, companyId: this.companyId() },
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
