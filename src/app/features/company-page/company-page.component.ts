import { Component, inject, OnInit, signal } from '@angular/core';
import { CompanyService } from '../../core/services/company/company.service';
import { UiResponsiveDataViewComponent } from '../../shared/components/responsive-data-view/responsive-data-view.component';
import { UiDataElement } from '../../shared/components/responsive-data-view/data-element/data-element.component';
import { Company } from '../../core/models/company.model';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { CompanyAddDialogComponent } from './company-add-dialog/company-add-dialog.component';
import { UiDialogService } from '../../core/services/dialog/dialog.service';

@Component({
  selector: 'app-company-page',
  standalone: true,
  imports: [UiResponsiveDataViewComponent, UiDataElement, TranslocoModule],
  templateUrl: './company-page.component.html',
  providers: [UiDialogService],
})
export class CompanyPageComponent implements OnInit {
  private readonly _companyService = inject(CompanyService);
  private readonly _dialogService = inject(UiDialogService);
  private readonly _translocoService = inject(TranslocoService);

  data = signal<Partial<Company>[]>([]);
  ngOnInit(): void {
    this.fetchCompanies();
  }

  onAddClick() {
    this._dialogService
      .open(CompanyAddDialogComponent, {
        header: this._translocoService.translate('company'),
      })
      .onClose.subscribe((data) => !!data && this.fetchCompanies());
  }

  fetchCompanies() {
    this._companyService.get().subscribe((company) => this.data.set([company]));
  }
}
