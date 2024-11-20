import { inject, Injectable } from '@angular/core';
import { BaseHttpService } from '../base-http/base-http.service';
import { Company } from '../../models/company.model';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private entityName = 'company';

  private readonly _baseHttpService = inject(BaseHttpService);

  get() {
    return this._baseHttpService.get<{ company: Company }>(
      `${this.entityName}`
    );
  }

  create(data: { name: string }) {
    return this._baseHttpService.post<unknown, { name: string }>(
      `${this.entityName}`,
      data
    );
  }
}
