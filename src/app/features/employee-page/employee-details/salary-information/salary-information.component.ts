import { Component, input, inject, signal } from '@angular/core';
import { EmployeeService } from '../../../../core/services/employee/employee.service';
import { SalaryModel } from '../../../../core/models/salary.model';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { ButtonModule } from 'primeng/button';
import { SalaryComponent } from '../../salary/salary.component';
import { UiDataElement } from '../../../../shared/components/responsive-data-view/data-element/data-element.component';
import { UiResponsiveDataViewComponent } from '../../../../shared/components/responsive-data-view/responsive-data-view.component';
import { UiTemplateDirective } from '../../../../shared/directives/template/ui-template.directive';
import { DatePipe } from '@angular/common';
import { UiDialogService } from '../../../../core/services/dialog/dialog.service';

@Component({
  selector: 'employee-salary-information',
  standalone: true,
  imports: [
    TranslocoDirective,
    ButtonModule,
    UiDataElement,
    UiResponsiveDataViewComponent,
    UiTemplateDirective,
    DatePipe,
  ],
  templateUrl: './salary-information.component.html',
})
export class SalaryInformationComponent {
  employeeId = input.required<number>();

  data = signal<Partial<SalaryModel>[]>([]);

  private _employeeService = inject(EmployeeService);
  private _dialogService = inject(UiDialogService);
  private _translocoService = inject(TranslocoService);

  ngOnInit(): void {
    this.fetchSalary();
  }

  onAddClick() {
    this._dialogService
      .open(SalaryComponent, {
        header: this._translocoService.translate('salary'),
        data: { salary: null, employeeId: this.employeeId() },
      })
      .onClose.subscribe((data) => !!data && this.fetchSalary());
  }

  onRowClick({ dataItem }: any) {
    this._dialogService
      .open(SalaryComponent, {
        header: this._translocoService.translate('salary'),
        data: { salary: dataItem, employeeId: this.employeeId() },
      })
      .onClose.subscribe((data) => !!data && this.fetchSalary());
  }

  onDeleteClick({ dataItem }: any) {
    this._employeeService
      .deleteSalary(this.employeeId(), dataItem.id)
      .subscribe(() => this.fetchSalary());
  }

  fetchSalary() {
    this._employeeService
      .getAllSalary(this.employeeId())
      .subscribe((employees) => this.data.set(employees));
  }
}
