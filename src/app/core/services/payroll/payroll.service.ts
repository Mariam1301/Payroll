import { inject, Injectable } from '@angular/core';
import { BaseHttpService } from '../base-http/base-http.service';
import { Employee } from '../../models/employee.model';
import { SalaryModel } from '../../models/salary.model';
import { map } from 'rxjs';
import { Benefit } from '../../models/benefit.model';
import { Deduction } from '../../models/deduction.model';
import { IncentiveBonus } from '../../models/incentive-bonus';
import { Exemption } from '../../models/exemption.model';
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
