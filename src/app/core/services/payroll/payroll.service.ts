import { inject, Injectable } from '@angular/core';
import { BaseHttpService } from '../base-http/base-http.service';
import {
  PayrollCalculationResultModel,
  PayrollGenerationModel,
} from '../../models/payroll-generation.model';

@Injectable({
  providedIn: 'root',
})
export class PayrollService {
  private entityName = 'company/payroll';

  private readonly _baseHttpService = inject(BaseHttpService);

  calculatePayroll(data: PayrollGenerationModel) {
    return this._baseHttpService.get<PayrollCalculationResultModel[]>(
      `${this.entityName}/calculate`,
      data,
    );
  }
}
