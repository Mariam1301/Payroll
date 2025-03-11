import { CompanyService } from '../../../core/services/company/company.service';
import { Component, inject, OnInit, signal } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { Company } from '../../../core/models/company.model';
import { OvertimePolicyInformationComponent } from './overtime-policy-information/overtime-policy-information.component';
import { MonthlyAdjustmentTypesInformationComponent } from './monthly-adjustment-types-information/monthly-adjustment-types-information.component';
import { TimeBasedAdjustmentTypesInformationComponent } from './time-based-adjustment-types-information/time-based-adjustment-types-information.component';

@Component({
  standalone: true,
  imports: [
    TranslocoModule,
    CheckboxModule,
    FormsModule,
    OvertimePolicyInformationComponent,
    MonthlyAdjustmentTypesInformationComponent,
    TimeBasedAdjustmentTypesInformationComponent,
  ],
  templateUrl: './company-details.component.html',
})
export class CompanyDetailsComponent implements OnInit {
  private companyService = inject(CompanyService);
  // private _dialogService = inject(UiDialogService);
  // private _translocoService = inject(TranslocoService);

  companyDetails = signal<Company | null>(null);

  ngOnInit() {
    this.companyService
      .get()
      .subscribe((company) => this.companyDetails.set(company));
  }
}
