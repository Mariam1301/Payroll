import { inject, Injectable } from '@angular/core';
import { BaseHttpService } from '../base-http/base-http.service';
import { MonthlySalaryAdjustmentType } from '../../models/monthly-salary-adjustment-type.model';

@Injectable({
  providedIn: 'root',
})
export class MonthlySalaryAdjustmentsService {
  private entityName = 'company/monthly-salary-adjustments';

  private readonly _baseHttpService = inject(BaseHttpService);

  getAll() {
    return this._baseHttpService.get<MonthlySalaryAdjustmentType[]>(
      `${this.entityName}`,
    );
  }

  add(data: Partial<MonthlySalaryAdjustmentType>) {
    return this._baseHttpService.post<
      unknown,
      Partial<MonthlySalaryAdjustmentType>
    >(`${this.entityName}`, data);
  }

  update(data: Partial<MonthlySalaryAdjustmentType>) {
    return this._baseHttpService.put<
      unknown,
      Partial<MonthlySalaryAdjustmentType>
    >(`${this.entityName}/${data.id}`, data);
  }

  delete(id: number) {
    return this._baseHttpService.delete<unknown>(`${this.entityName}/${id}`);
  }
}
