import { inject, Injectable } from '@angular/core';
import { BaseHttpService } from '../base-http/base-http.service';
import { OneTimeSalaryAdjustment } from '../../models/one-time-salary-adjustment.model';

@Injectable({
  providedIn: 'root',
})
export class OneTimeSalaryAdjustmentsService {
  private entityName = 'company/one-time-salary-adjustment';

  private readonly _baseHttpService = inject(BaseHttpService);

  getAll() {
    return this._baseHttpService.get<OneTimeSalaryAdjustment[]>(
      `${this.entityName}`,
    );
  }

  add(data: Partial<OneTimeSalaryAdjustment>) {
    return this._baseHttpService.post<
      unknown,
      Partial<OneTimeSalaryAdjustment>
    >(`${this.entityName}`, data);
  }

  update(data: Partial<OneTimeSalaryAdjustment>) {
    return this._baseHttpService.put<unknown, Partial<OneTimeSalaryAdjustment>>(
      `${this.entityName}/${data.id}`,
      data,
    );
  }

  delete(id: number) {
    return this._baseHttpService.delete<unknown>(`${this.entityName}/${id}`);
  }
}
