import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UiFormFieldComponent } from '../../../shared/components/form-field/form-field.component';
import { Exemption } from '../../../core/models/exemption.model';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EmployeeService } from '../../../core/services/employee/employee.service';
import { formatDateToISODate } from '../../../core/utils/date-formating';
import { Select } from 'primeng/select';
import { DatePicker } from 'primeng/datepicker';
import { UiDialogActionsComponent } from '../../../shared/components/dialog-actions/dialog-actions.component';
import { InputTextModule } from 'primeng/inputtext';
import { DateTypePipe } from '../../../core/pipes/date-type.pipe';
import { CheckboxModule } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';
import { TooltipModule } from 'primeng/tooltip';
import {
  EXEMPTION_LIMIT_AMOUNT_OPTIONS,
  EXEMPTION_PERCENT_TYPE_OPTIONS,
} from '../../../core/constants/exemption.constants';
import { SelectButtonModule } from 'primeng/selectbutton';

@Component({
  templateUrl: './exemptions.component.html',
  standalone: true,
  imports: [
    FormsModule,
    UiFormFieldComponent,
    Select,
    DatePicker,
    UiDialogActionsComponent,
    TranslocoDirective,
    InputTextModule,
    DateTypePipe,
    CheckboxModule,
    InputNumberModule,
    TooltipModule,
    SelectButtonModule,
  ],
})
export class ExemptionsComponent {
  exemption = signal<Partial<Exemption>>({});

  private readonly _translocoService = inject(TranslocoService);
  private readonly _ref = inject(DynamicDialogRef);
  private readonly _dialogConfig = inject(DynamicDialogConfig);
  private readonly _employeeService = inject(EmployeeService);

  limitAmountTypeOptions = EXEMPTION_LIMIT_AMOUNT_OPTIONS.map((option) => ({
    ...option,
    label: this._translocoService.translate(option.label),
  }));

  percentOption = EXEMPTION_PERCENT_TYPE_OPTIONS;

  ngOnInit(): void {
    const exemption = this._dialogConfig.data?.exemption;
    if (exemption) {
      this.exemption.set({ ...exemption });
    }
  }

  onSaveClick() {
    const employeeId = this._dialogConfig.data?.employeeId;
    const data = {
      ...this.exemption(),
      end_date: formatDateToISODate(this.exemption().end_date!),
      start_date: formatDateToISODate(this.exemption().start_date!),
      balance_date: formatDateToISODate(this.exemption().balance_date!),
    };
    const stream$ = data?.id
      ? this._employeeService.updateIncomeTaxExemption(employeeId, data)
      : this._employeeService.addIncomeTaxExemption(employeeId, data);
    stream$.subscribe(() => this._ref.close(true));
  }

  onConstantChange() {
    this.exemption.update((prev) => ({
      ...prev,
      end_date: undefined,
    }));
  }
}
