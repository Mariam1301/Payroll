import { Component, inject, signal } from '@angular/core';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { UiDataElement } from '../../shared/components/responsive-data-view/data-element/data-element.component';
import { UiResponsiveDataViewComponent } from '../../shared/components/responsive-data-view/responsive-data-view.component';
import { Router } from '@angular/router';
import { UiDialogService } from '../../core/services/dialog/dialog.service';
import { PayrollGenerationInfo } from '../../core/models/payroll-generation.model';
import { PayrollGenerationDialogComponent } from './payroll-generation-dialog/payroll-generation-dialog.component';
import { GenderEnum } from '../../core/models/general.model';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-payroll-generation',
  standalone: true,
  imports: [
    TranslocoDirective,
    UiDataElement,
    UiResponsiveDataViewComponent,
    DatePipe,
    CommonModule,
  ],
  templateUrl: './payroll-generation.component.html',
})
export class PayrollGenerationComponent {
  data = signal<Partial<PayrollGenerationInfo>[]>([]);
  router = inject(Router);

  private readonly _dialogService = inject(UiDialogService);
  private readonly _translocoService = inject(TranslocoService);

  ngOnInit(): void {
    this.fetchPayroll();
  }

  onGeneratePayrollClick() {
    this._dialogService
      .open(PayrollGenerationDialogComponent, {
        header: this._translocoService.translate('employee'),
      })
      .onClose.subscribe(
        (data) =>
          !!data &&
          this.data.set([
            {
              employee_name: 'John',
              employee_surname: 'Doe',
              employee_position: 'Software Engineer',
              employee_email: 'test@gmail.com',
              employee_address: 'Tbilisi, Georgia',
              employee_bank_account: 922922929929292,
              employee_birth_date: new Date('1990-01-01'),
              employee_id_number: 123456789,
              employee_gender: GenderEnum.Female,
              employee_residency: 'Tbilisi, Georgia',
              salary: 1000,
              date_from: '2021-01-01',
              date_to: '2021-01-31',
            },
          ]),
      );
  }

  fetchPayroll() {
    // this._employeeService
    //   .getAll()
    //   .subscribe((employees) => this.data.set(employees));
  }
}
