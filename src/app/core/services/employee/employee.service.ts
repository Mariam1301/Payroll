import { inject, Injectable } from '@angular/core';
import { BaseHttpService } from '../base-http/base-http.service';
import { Employee } from '../../models/employee.model';
import { SalaryModel } from '../../models/salary.model';
import { map } from 'rxjs';
import { IncentiveBonus } from '../../models/incentive-bonus';
import { Exemption } from '../../models/exemption.model';
import { MonthlySalaryAdjustment } from '../../models/monthly-salary-adjustment.model';

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

  add(data: any) {
    return this._baseHttpService.post<unknown, any>(`${this.entityName}`, data);
  }

  update(data: any) {
    return this._baseHttpService.put<unknown, any>(
      `${this.entityName}/${data.id}`,
      data,
    );
  }

  delete(id: number) {
    return this._baseHttpService.delete<unknown>(`${this.entityName}/${id}`);
  }

  getSalary(employeeId: number, salaryId: number) {
    return this._baseHttpService.get<SalaryModel>(
      `${this.entityName}/${employeeId}/salaries/${salaryId}`,
    );
  }

  addSalary(employeeId: number, data: Partial<SalaryModel>) {
    return this._baseHttpService.post(
      `${this.entityName}/${employeeId}/salaries`,
      data,
    );
  }

  getAllSalary(employeeId: number) {
    return this._baseHttpService
      .get<{
        data: Partial<SalaryModel>[];
      }>(`${this.entityName}/${employeeId}/salaries`)
      .pipe(map((data) => data.data));
  }

  updateSalary(employeeId: number, data: Partial<SalaryModel>) {
    return this._baseHttpService.put(
      `${this.entityName}/${employeeId}/salaries/${data.id}`,
      data,
    );
  }

  deleteSalary(employeeId: number, salaryId: number) {
    return this._baseHttpService.delete(
      `${this.entityName}/${employeeId}/salaries/${salaryId}`,
    );
  }

  // addBenefit(employeeId: number, data: Partial<MonthlySalaryAdjustment>) {
  //   return this._baseHttpService.post(
  //     `${this.entityName}/${employeeId}/benefits`,
  //     data,
  //   );
  // }

  // getBenefits(employeeId: number) {
  //   return this._baseHttpService
  //     .get<{
  //       benefits: Partial<MonthlySalaryAdjustment>[];
  //     }>(`${this.entityName}/${employeeId}/benefits`)
  //     .pipe(map((data) => data.benefits));
  // }

  // updateBenefit(employeeId: number, data: Partial<MonthlySalaryAdjustment>) {
  //   return this._baseHttpService.put(
  //     `${this.entityName}/${employeeId}/benefits/${data.id}`,
  //     data,
  //   );
  // }

  // deleteBenefit(employeeId: number, benefitId: number) {
  //   return this._baseHttpService.delete(
  //     `${this.entityName}/${employeeId}/benefits/${benefitId}`,
  //   );
  // }

  // addDeduction(employeeId: number, data: Partial<Deduction>) {
  //   return this._baseHttpService.post(
  //     `${this.entityName}/${employeeId}/deductions`,
  //     data,
  //   );
  // }

  // getDeductions(employeeId: number) {
  //   return this._baseHttpService
  //     .get<{
  //       deductions: Partial<Deduction>[];
  //     }>(`${this.entityName}/${employeeId}/deductions`)
  //     .pipe(map((data) => data.deductions));
  // }

  // updateDeduction(employeeId: number, data: Partial<Deduction>) {
  //   return this._baseHttpService.put(
  //     `${this.entityName}/${employeeId}/deductions/${data.id}`,
  //     data,
  //   );
  // }

  // deleteDeduction(employeeId: number, deductionId: number) {
  //   return this._baseHttpService.delete(
  //     `${this.entityName}/${employeeId}/deductions/${deductionId}`,
  //   );
  // }

  addMonthlySalaryAdjustment(
    employeeId: number,
    data: Partial<MonthlySalaryAdjustment>,
  ) {
    return this._baseHttpService.post(
      `${this.entityName}/${employeeId}/monthly-salary-adjustments`,
      data,
    );
  }

  getMonthlySalaryAdjustments(employeeId: number) {
    return this._baseHttpService.get<Partial<MonthlySalaryAdjustment>[]>(
      `${this.entityName}/${employeeId}/monthly-salary-adjustments`,
    );
  }

  updateMonthlySalaryAdjustment(
    employeeId: number,
    data: Partial<MonthlySalaryAdjustment>,
  ) {
    return this._baseHttpService.put(
      `${this.entityName}/${employeeId}/monthly-salary-adjustments/${data.id}`,
      data,
    );
  }

  deleteMonthlySalaryAdjustment(employeeId: number, deductionId: number) {
    return this._baseHttpService.delete(
      `${this.entityName}/${employeeId}/monthly-salary-adjustments/${deductionId}`,
    );
  }

  addIncentiveBonus(employeeId: number, data: Partial<IncentiveBonus>) {
    return this._baseHttpService.post(
      `${this.entityName}/${employeeId}/incentive-bonuses`,
      data,
    );
  }

  getIncentiveBonus(employeeId: number) {
    return this._baseHttpService
      .get<
        Partial<IncentiveBonus>[]
      >(`${this.entityName}/${employeeId}/incentive-bonuses`)
      .pipe(map((data) => data));
  }

  updateIncentiveBonus(employeeId: number, data: Partial<IncentiveBonus>) {
    return this._baseHttpService.put(
      `${this.entityName}/${employeeId}/incentive-bonuses/${data.id}`,
      data,
    );
  }

  deleteIncentiveBonus(employeeId: number, incentiveBonusId: number) {
    return this._baseHttpService.delete(
      `${this.entityName}/${employeeId}/incentive-bonuses/${incentiveBonusId}`,
    );
  }

  addIncomeTaxExemption(employeeId: number, data: Partial<Exemption>) {
    return this._baseHttpService.post(
      `${this.entityName}/${employeeId}/tax-exemptions`,
      data,
    );
  }

  getIncomeTaxExemption(employeeId: number) {
    return this._baseHttpService
      .get<
        Partial<Exemption>[]
      >(`${this.entityName}/${employeeId}/tax-exemptions`)
      .pipe(map((data) => data));
  }

  updateIncomeTaxExemption(employeeId: number, data: Partial<Exemption>) {
    return this._baseHttpService.put(
      `${this.entityName}/${employeeId}/tax-exemptions/${data.id}`,
      data,
    );
  }

  deleteIncomeTaxExemption(employeeId: number, exemptionId: number) {
    return this._baseHttpService.delete(
      `${this.entityName}/${employeeId}/tax-exemptions/${exemptionId}`,
    );
  }

  addOneTimeSalaryAdjustment(
    employeeId: number,
    data: Partial<MonthlySalaryAdjustment>,
  ) {
    return this._baseHttpService.post(
      `${this.entityName}/${employeeId}/one-time-adjustments`,
      data,
    );
  }

  updateOneTimeSalaryAdjustment(
    employeeId: number,
    data: Partial<MonthlySalaryAdjustment>,
  ) {
    return this._baseHttpService.put(
      `${this.entityName}/${employeeId}/one-time-adjustments/${data.id}`,
      data,
    );
  }

  deleteOneTimeSalaryAdjustment(employeeId: number, deductionId: number) {
    return this._baseHttpService.delete(
      `${this.entityName}/${employeeId}/one-time-adjustments/${deductionId}`,
    );
  }
}
