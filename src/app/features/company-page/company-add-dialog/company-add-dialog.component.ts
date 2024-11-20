import { Component, inject, signal } from '@angular/core';
import { UiDialogActionsComponent } from '../../../shared/components/dialog-actions/dialog-actions.component';
import { FormsModule } from '@angular/forms';
import { UiFormFieldComponent } from '../../../shared/components/form-field/form-field.component';
import { Company } from '../../../core/models/company.model';
import { TranslocoModule } from '@jsverse/transloco';
import { InputTextModule } from 'primeng/inputtext';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { CompanyService } from '../../../core/services/company/company.service';

@Component({
  selector: 'company-page',
  standalone: true,
  imports: [
    UiDialogActionsComponent,
    FormsModule,
    UiFormFieldComponent,
    TranslocoModule,
    InputTextModule,
  ],
  templateUrl: './company-add-dialog.component.html',
})
export class CompanyAddDialogComponent {
  companyData = signal<Partial<Company>>({});

  private readonly _ref = inject(DynamicDialogRef);
  private readonly _companyService = inject(CompanyService);

  onSaveClick() {
    this._companyService
      .create({ name: this.companyData().name! })
      .subscribe(() => this._ref.close(true));
  }
}
