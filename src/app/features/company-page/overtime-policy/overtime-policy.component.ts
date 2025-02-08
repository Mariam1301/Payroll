import { Component, inject, OnInit, signal } from '@angular/core';
import { DatePicker } from 'primeng/datepicker';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { UiDialogActionsComponent } from '../../../shared/components/dialog-actions/dialog-actions.component';
import { UiFormFieldComponent } from '../../../shared/components/form-field/form-field.component';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CurrencyEnum } from '../../../core/models/general.model';
import { InputNumberModule } from 'primeng/inputnumber';
import { OvertimePolicy } from '../../../core/models/ovetime-policy.model';
import { CompanyService } from '../../../core/services/company/company.service';

@Component({
  selector: 'app-overtime-policy',
  standalone: true,
  imports: [
    DatePicker,
    CheckboxModule,
    DropdownModule,
    FormsModule,
    InputTextModule,
    ReactiveFormsModule,
    TranslocoDirective,
    UiDialogActionsComponent,
    UiFormFieldComponent,
    InputNumberModule,
  ],
  templateUrl: './ovetime-policy.component.html',
})
export class OvertimePolicyComponent implements OnInit {
  overtimePolicy = signal<Partial<OvertimePolicy>>({});

  private readonly _ref = inject(DynamicDialogRef);
  private readonly _dialogConfig = inject(DynamicDialogConfig);
  private readonly _companyService = inject(CompanyService);

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
    const overtimePolicy = { ...this._dialogConfig.data?.overtimePolicy };
    overtimePolicy && this.overtimePolicy.set(overtimePolicy);
  }

  onSaveClick() {
    const companyId = this._dialogConfig.data?.companyId;
    // const data = {
    //   ...this.overtimePolicy(),
    //
    // };
    // const stream$ = data?.id
    //   ? this._employeeService.updateBenefit(employeeId, data)
    //   : this._employeeService.addBenefit(employeeId, data);

    console.log(this.overtimePolicy());
  }
}
