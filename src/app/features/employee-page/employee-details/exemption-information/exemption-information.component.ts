import { Component, inject, input, signal } from '@angular/core';
import { UiResponsiveDataViewComponent } from '../../../../shared/components/responsive-data-view/responsive-data-view.component';
import { UiDataElement } from '../../../../shared/components/responsive-data-view/data-element/data-element.component';
import { Exemption } from '../../../../core/models/exemption.model';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { DialogService } from 'primeng/dynamicdialog';
import { EmployeeService } from '../../../../core/services/employee/employee.service';
import { ExemptionsComponent } from '../../exemptions/exemptions.component';
import { DatePipe } from '@angular/common';
import { UiTemplateDirective } from '../../../../shared/directives/template/ui-template.directive';

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
export class ExemptionInformationComponent {
  employeeId = input.required<number>();

  data = signal<Partial<Exemption>[]>([]);

  private _employeeService = inject(EmployeeService);
  private _dialogService = inject(DialogService);
  private _translocoService = inject(TranslocoService);

  ngOnInit(): void {
    this.fetch();
  }

  onAddClick() {
    this._dialogService
      .open(ExemptionsComponent, {
        header: this._translocoService.translate('exemption'),
        width: '70vw',
        data: { exemption: null, employeeId: this.employeeId() },
      })
      .onClose.subscribe((data) => !!data && this.fetch());
  }

  onRowClick({ dataItem }: any) {
    this._dialogService
      .open(ExemptionsComponent, {
        header: this._translocoService.translate('exemption'),
        width: '70vw',
        data: { exemption: dataItem, employeeId: this.employeeId() },
      })
      .onClose.subscribe((data) => !!data && this.fetch());
  }

  onDeleteClick({ dataItem }: any) {}

  fetch() {}
}
