import { inject, Injectable } from '@angular/core';
import { BaseHttpService } from '../base-http/base-http.service';
import { Employee } from '../../models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private entityName = 'company/employee';

  private readonly _baseHttpService = inject(BaseHttpService);

  getAll() {
    return this._baseHttpService.get<Employee[]>(`${this.entityName}`);
  }

  get(id: number) {
    return this._baseHttpService.get<Employee>(`${this.entityName}/${id}`);
  }

  add(data: Employee) {
    return this._baseHttpService.post<unknown, Employee>(
      `${this.entityName}`,
      data
    );
  }

  update(data: Employee) {
    return this._baseHttpService.put<unknown, Employee>(
      `${this.entityName}`,
      data
    );
  }

  delete(id: number) {
    return this._baseHttpService.delete<unknown>(`${this.entityName}/${id}`);
  }
}
