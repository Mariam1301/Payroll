import { inject, Injectable } from '@angular/core';
import { BaseHttpService } from '../base-http/base-http.service';
import { Employee } from '../../models/employee.model';
import {
  MonthlyOvertimeInformation,
  MonthlyOvertimeType,
} from '../../models/monthly-overtime.model';
import { OvertimePolicy } from '../../models/ovetime-policy.model';

@Injectable({
  providedIn: 'root',
})
export class MonthlyOvertimesService {
  private entityName = 'company/overtimes';

  private readonly _baseHttpService = inject(BaseHttpService);

  getAll() {
    // return this._baseHttpService.get<MonthlyOvertimeInformation[]>(`${this.entityName}`);
  }

  get(id: number) {
    // return this._baseHttpService.get<MonthlyOvertimeInformation>(`${this.entityName}/${id}`);
  }

  add(data: Partial<MonthlyOvertimeType>) {
    // return this._baseHttpService.post<unknown, Partial<MonthlyOvertimeType>>(`${this.entityName}`, data);
  }

  update(data: Partial<MonthlyOvertimeType>) {
    // return this._baseHttpService.put<unknown, Partial<MonthlyOvertimeType>>(`${this.entityName}/${data.id}`, data);
  }

  delete(id: number) {
    // return this._baseHttpService.delete<unknown>(`${this.entityName}/${id}`);
  }
}
