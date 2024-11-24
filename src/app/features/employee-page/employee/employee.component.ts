import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { InputTextModule } from 'primeng/inputtext';
import { UiDialogActionsComponent } from '../../../shared/components/dialog-actions/dialog-actions.component';
import { UiFormFieldComponent } from '../../../shared/components/form-field/form-field.component';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import {
  CurrencyEnum,
  Employee,
  SalaryTypeEnum,
} from '../../../core/models/employee.model';
import { EmployeeService } from '../../../core/services/employee/employee.service';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputMaskModule } from 'primeng/inputmask';
import { DropdownModule } from 'primeng/dropdown';
import { GenderEnum } from '../../../core/models/general.model';
import { CalendarModule } from 'primeng/calendar';
import { IbanValidatorDirective } from '../../../shared/directives/iban-validator/iban-validator.directive';
import { CheckboxModule } from 'primeng/checkbox';
import { JsonPipe } from '@angular/common';

@Component({
  standalone: true,
  imports: [
    UiDialogActionsComponent,
    FormsModule,
    UiFormFieldComponent,
    TranslocoModule,
    InputTextModule,
    InputNumberModule,
    InputMaskModule,
    DropdownModule,
    CalendarModule,
    IbanValidatorDirective,
    CheckboxModule,
    JsonPipe,
  ],
  templateUrl: './employee.component.html',
})
export class EmployeeComponent {
  employeeData = signal<Partial<Employee>>({ salary: {} });

  private readonly _employeeService = inject(EmployeeService);
  private readonly _ref = inject(DynamicDialogRef);
  private readonly _translocoService = inject(TranslocoService);

  genderOptions = signal<{ id: GenderEnum; label: string }[]>([
    {
      id: GenderEnum.Female,
      label: this._translocoService.translate('female'),
    },
    {
      id: GenderEnum.Male,
      label: this._translocoService.translate('male'),
    },
  ]);

  salaryTypeOptions = signal<{ id: SalaryTypeEnum; label: string }[]>([
    {
      id: SalaryTypeEnum.Gross,
      label: this._translocoService.translate('gross'),
    },
    {
      id: SalaryTypeEnum.Net,
      label: this._translocoService.translate('net'),
    },
  ]);

  currencyOptions = signal<{ id: CurrencyEnum; label: string }[]>([
    {
      id: CurrencyEnum.GEL,
      label: 'GEL',
    },
    {
      id: CurrencyEnum.EUR,
      label: 'EUR',
    },
    {
      id: CurrencyEnum.USD,
      label: 'USD',
    },
  ]);

  onSaveClick() {
    this._employeeService
      .add(this.employeeData() as Employee)
      .subscribe(() => this._ref.close(true));
  }
}
