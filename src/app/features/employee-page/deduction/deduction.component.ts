import { Component, inject, signal } from '@angular/core';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { DateTypePipe } from '../../../core/pipes/date-type.pipe';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { UiDialogActionsComponent } from '../../../shared/components/dialog-actions/dialog-actions.component';
import { UiFormFieldComponent } from '../../../shared/components/form-field/form-field.component';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EmployeeService } from '../../../core/services/employee/employee.service';
import { CurrencyEnum } from '../../../core/models/general.model';
import { formatDateToISODate } from '../../../core/utils/date-formating';
import { Deduction } from '../../../core/models/deduction.model';

@Component({
  selector: 'app-deduction',
  standalone: true,
  imports: [
    CalendarModule,
    CheckboxModule,
    DateTypePipe,
    DropdownModule,
    FormsModule,
    InputTextModule,
    ReactiveFormsModule,
    TranslocoDirective,
    UiDialogActionsComponent,
    UiFormFieldComponent,
  ],
  templateUrl: './deduction.component.html',
})
export class DeductionComponent {
  deduction = signal<Partial<Deduction>>({});

  private readonly _ref = inject(DynamicDialogRef);
  private readonly _dialogConfig = inject(DynamicDialogConfig);
  private readonly _employeeService = inject(EmployeeService);

  currentDeduction = signal(true);

  now = new Date();

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

  ngOnInit(): void {
    const deduction = { ...this._dialogConfig.data?.deduction };
    deduction && this.deduction.set(deduction);
    this.currentDeduction.set(!deduction.end_date);
  }

  onSaveClick() {
    const employeeId = this._dialogConfig.data?.employeeId;
    const data = {
      ...this.deduction(),
      start_date: formatDateToISODate(this.deduction().start_date!),
      end_date: formatDateToISODate(this.deduction().end_date!),
    };
    const stream$ = data?.id
      ? this._employeeService.updateDeduction(employeeId, data)
      : this._employeeService.addDeduction(employeeId, data);

    stream$.subscribe(() => this._ref.close(true));
  }

  onCurrentDeductionChange() {
    this.deduction.update((prev) => ({ ...prev, end_date: undefined }));
  }
}
