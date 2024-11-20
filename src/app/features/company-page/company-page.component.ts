import { Component, inject, OnInit, signal } from '@angular/core';
import { CompanyService } from '../../core/services/company/company.service';
import { UiResponsiveDataViewComponent } from '../../shared/components/responsive-data-view/responsive-data-view.component';
import { UiDataElement } from '../../shared/components/responsive-data-view/data-element/data-element.component';
import { Company } from '../../core/models/company.model';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'app-company-page',
  standalone: true,
  imports: [UiResponsiveDataViewComponent, UiDataElement, TranslocoDirective],
  templateUrl: './company-page.component.html',
})
export class CompanyPageComponent implements OnInit {
  private readonly _companyService = inject(CompanyService);

  data = signal<Partial<Company>[]>([]);
  ngOnInit(): void {
    this._companyService
      .get()
      .subscribe(({ company }) => this.data.set([company]));
  }

  onAddClick() {}
}
