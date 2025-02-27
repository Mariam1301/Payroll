import { inject, Injectable } from '@angular/core';
import { BaseHttpService } from '../base-http/base-http.service';
import { OneTimeSalaryAdjustment } from '../../models/one-time-salary-adjustment.model';

@Injectable({
  providedIn: 'root',
})
export class OneTimeSalaryAdjustmentsService {
  private entityName = 'company/one-time-adjustments';

  private readonly _baseHttpService = inject(BaseHttpService);

  getAll() {
    return this._baseHttpService.get<OneTimeSalaryAdjustment[]>(
      `${this.entityName}`,
    );
  }
}
