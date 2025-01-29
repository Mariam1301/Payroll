import {Component, inject, input, OnInit, signal} from '@angular/core';
import { UiResponsiveDataViewComponent } from '../../../../shared/components/responsive-data-view/responsive-data-view.component';
import { UiDataElement } from '../../../../shared/components/responsive-data-view/data-element/data-element.component';
import {Exemption, LimitType} from '../../../../core/models/exemption.model';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { EmployeeService } from '../../../../core/services/employee/employee.service';
import { ExemptionsComponent } from '../../exemptions/exemptions.component';
import { DatePipe } from '@angular/common';
import { UiTemplateDirective } from '../../../../shared/directives/template/ui-template.directive';
import { UiDialogService } from '../../../../core/services/dialog/dialog.service';

@Component({
  templateUrl: './exemption-information.component.html',
  selector: 'employee-exemption-information',
  standalone: true,
  imports: [
    UiResponsiveDataViewComponent,
    UiDataElement,
    DatePipe,
    UiTemplateDirective,
    TranslocoDirective,
  ],
})
export class ExemptionInformationComponent implements OnInit {
  employeeId = input.required<number>();

  data = signal<Partial<Exemption>[]>([]);

  limitType = LimitType

  private _employeeService = inject(EmployeeService);
  private _dialogService = inject(UiDialogService);
  private _translocoService = inject(TranslocoService);

  ngOnInit(): void {
    this.fetch();
  }

  onAddClick() {
    this._dialogService
      .open(ExemptionsComponent, {
        header: this._translocoService.translate('incomeTaxExemption'),
        data: { exemption: null, employeeId: this.employeeId() },
      })
      .onClose.subscribe((data) => !!data && this.fetch());
  }

  onRowClick({ dataItem }: any) {
    this._dialogService
      .open(ExemptionsComponent, {
        header: this._translocoService.translate('incomeTaxExemption'),
        data: { exemption: dataItem, employeeId: this.employeeId() },
      })
      .onClose.subscribe((data) => !!data && this.fetch());
  }

  onDeleteClick({ dataItem }: any) {
  this._employeeService.deleteIncomeTaxExemption(this.employeeId(), dataItem?.id).subscribe(() => this.fetch());
  }

  fetch(){
  this._employeeService
.getIncomeTaxExemption(this.employeeId())
.subscribe((exemptions) => this.data.set(exemptions));}
}
