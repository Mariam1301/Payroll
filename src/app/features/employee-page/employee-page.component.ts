import { Component, inject, OnInit, signal } from '@angular/core';
import { UiResponsiveDataViewComponent } from '../../shared/components/responsive-data-view/responsive-data-view.component';
import { UiDataElement } from '../../shared/components/responsive-data-view/data-element/data-element.component';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { EmployeeService } from '../../core/services/employee/employee.service';
import { Employee } from '../../core/models/employee.model';
import { UiDialogService } from '../../core/services/dialog/dialog.service';
import { EmployeeComponent } from './employee/employee.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-page',
  standalone: true,
  imports: [UiResponsiveDataViewComponent, UiDataElement, TranslocoModule],
  templateUrl: './employee-page.component.html',
  providers: [UiDialogService],
})
export class EmployeePageComponent implements OnInit {
  data = signal<Partial<Employee>[]>([]);
  router = inject(Router);

  private readonly _employeeService = inject(EmployeeService);
  private readonly _dialogService = inject(UiDialogService);
  private readonly _translocoService = inject(TranslocoService);

  ngOnInit(): void {
    this.fetchEmployee();
  }

  onAddClick() {
    this._dialogService
      .open(EmployeeComponent, {
        header: this._translocoService.translate('employee'),
      })
      .onClose.subscribe((data) => !!data && this.fetchEmployee());
  }

  onRowClick({ dataItem }: any) {
    this.router.navigate(['/employee/details', dataItem.id]);
  }

  onEditClick({ dataItem }: any) {
    this._dialogService
      .open(EmployeeComponent, {
        header: this._translocoService.translate('employee'),
        data: { ...dataItem },
      })
      .onClose.subscribe((data) => !!data && this.fetchEmployee());
  }

  onDeleteClick({ dataItem }: any) {
    this._employeeService
      .delete(dataItem.id)
      .subscribe(() => this.fetchEmployee());
  }

  fetchEmployee() {
    this._employeeService
      .getAll()
      .subscribe((employees) => this.data.set(employees));
  }
}
