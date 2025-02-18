import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { InputTextModule } from 'primeng/inputtext';
import { UiDialogActionsComponent } from '../../../shared/components/dialog-actions/dialog-actions.component';
import { UiFormFieldComponent } from '../../../shared/components/form-field/form-field.component';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Employee } from '../../../core/models/employee.model';
import { EmployeeService } from '../../../core/services/employee/employee.service';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputMaskModule } from 'primeng/inputmask';
import { Select } from 'primeng/select';
import { CurrencyEnum, GenderEnum } from '../../../core/models/general.model';
import { DatePicker } from 'primeng/datepicker';
import { CheckboxModule } from 'primeng/checkbox';
import { formatDateToISODate } from '../../../core/utils/date-formating';
import { DateTypePipe } from '../../../core/pipes/date-type.pipe';

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
    Select,
    DatePicker,
    CheckboxModule,
    DateTypePipe,
  ],
  templateUrl: './employee.component.html',
})
export class EmployeeComponent implements OnInit {
  employeeData = signal<Partial<Employee>>({});
  stillWorking = signal(true);

  now = new Date();

  private readonly _employeeService = inject(EmployeeService);
  private readonly _ref = inject(DynamicDialogRef);
  private readonly _dialogConfig = inject(DynamicDialogConfig);
  private readonly _translocoService = inject(TranslocoService);

  ngOnInit(): void {
    const employe = { ...this._dialogConfig.data };
    employe && this.employeeData.set(employe);
    this.stillWorking.set(!employe?.end_date);
  }

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

  onStillWorkingChange() {
    this.employeeData.update((prev) => ({ ...prev, end_date: undefined }));
  }

  onSaveClick() {
    const data = {
      ...this.employeeData(),
      phone: this.employeeData()?.phone?.toString(),
      id_number: this.employeeData()?.id_number?.toString(),
      birth_date: formatDateToISODate(this.employeeData().birth_date!),
      start_date: formatDateToISODate(this.employeeData().start_date!),
      end_date: formatDateToISODate(this.employeeData().end_date!),
    };

    const stream$ = this.employeeData().id
      ? this._employeeService.update(data)
      : this._employeeService.add(data);

    stream$.subscribe(() => this._ref.close(true));
  }
}
