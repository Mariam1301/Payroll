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
import { formatDateToISODate } from '../../../core/utils/date-formating';
import { Benefit } from '../../../core/models/benefit.model';
import { CurrencyEnum } from '../../../core/models/general.model';

@Component({
  selector: 'app-benefit',
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
  templateUrl: './benefit.component.html',
})
export class BenefitComponent {
  benefit = signal<Partial<Benefit>>({});

  private readonly _translocoService = inject(TranslocoService);
  private readonly _ref = inject(DynamicDialogRef);
  private readonly _dialogConfig = inject(DynamicDialogConfig);
  private readonly _employeeService = inject(EmployeeService);

  currentBenefit = signal(true);

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
    const benefit = this._dialogConfig.data?.benefit;
    benefit && this.benefit.set(benefit);
  }

  onSaveClick() {
    const employeeId = this._dialogConfig.data?.employeeId;
    const data = {
      ...this.benefit(),
      start_date: formatDateToISODate(this.benefit().start_date!),
      end_date: formatDateToISODate(this.benefit().end_date!),
    };
    const stream$ = data?.id
      ? this._employeeService.updateBenefit(employeeId, data)
      : this._employeeService.addBenefit(employeeId, data);

    stream$.subscribe(() => this._ref.close(true));
  }

  onCurrentBenefitChange() {
    this.benefit.update((prev) => ({ ...prev, end_date: undefined }));
  }
}
