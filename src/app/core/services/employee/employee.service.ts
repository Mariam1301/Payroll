import { inject, Injectable } from '@angular/core';
import { BaseHttpService } from '../base-http/base-http.service';
import { Employee } from '../../models/employee.model';
import {SalaryModel} from "../../models/salary.model";
import {map} from "rxjs";
import {Benefit} from "../../models/benefit.model";
import {Deduction} from "../../models/deduction.model";
import {IncentiveBonus} from "../../models/incentive-bonus";
import {Exemption} from "../../models/exemption.model";

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
    return this._baseHttpService.put<unknown, any>(`${this.entityName}/${data.id}`, data);
  }

  delete(id: number) {
    return this._baseHttpService.delete<unknown>(`${this.entityName}/${id}`);
  }

  getSalary(employeeId: number, salaryId: number){
    return this._baseHttpService.get<SalaryModel>(`${this.entityName}/${employeeId}/salaries/${salaryId}`);
  }

  addSalary(employeeId: number, data: Partial<SalaryModel>){
    return this._baseHttpService.post(`${this.entityName}/${employeeId}/salaries`, data);
  }

  getAllSalary(employeeId: number){
    return this._baseHttpService.get<{data: Partial<SalaryModel>[] }>(`${this.entityName}/${employeeId}/salaries`).pipe(map(data => data.data));
  }

  updateSalary(employeeId: number, data: Partial<SalaryModel>){
    return this._baseHttpService.put(`${this.entityName}/${employeeId}/salaries/${data.id}`, data);
  }

  deleteSalary(employeeId: number, salaryId: number){
    return this._baseHttpService.delete(`${this.entityName}/${employeeId}/salaries/${salaryId}`);
  }



  addBenefit(employeeId: number, data: Partial<Benefit>){
    return this._baseHttpService.post(`${this.entityName}/${employeeId}/benefits`, data);
  }

  getBenefits(employeeId: number){
    return this._baseHttpService.get<{benefits: Partial<Benefit>[] }>(`${this.entityName}/${employeeId}/benefits`).pipe(map(data => data.benefits));
  }

  updateBenefit(employeeId: number, data: Partial<Benefit>){
    return this._baseHttpService.put(`${this.entityName}/${employeeId}/benefits/${data.id}`, data);
  }

  deleteBenefit(employeeId: number, benefitId: number){
    return this._baseHttpService.delete(`${this.entityName}/${employeeId}/benefits/${benefitId}`);
  }

  addDeduction(employeeId: number, data: Partial<Deduction>){
    return this._baseHttpService.post(`${this.entityName}/${employeeId}/deductions`, data);
  }

  getDeductions(employeeId: number){
    return this._baseHttpService.get<{deductions: Partial<Deduction>[] }>(`${this.entityName}/${employeeId}/deductions`).pipe(map(data => data.deductions));
  }

  updateDeduction(employeeId: number, data: Partial<Deduction>){
    return this._baseHttpService.put(`${this.entityName}/${employeeId}/deductions/${data.id}`, data);
  }

  deleteDeduction(employeeId: number, deductionId: number){
    return this._baseHttpService.delete(`${this.entityName}/${employeeId}/deductions/${deductionId}`);
  }

  addIncentiveBonus(employeeId: number, data: Partial<IncentiveBonus>){
    return this._baseHttpService.post(`${this.entityName}/${employeeId}/incentive-bonuses`, data);
  }

  getIncentiveBonus(employeeId: number){
    return this._baseHttpService.get<Partial<IncentiveBonus>[] >(`${this.entityName}/${employeeId}/incentive-bonuses`).pipe(map(data => data));
  }

  updateIncentiveBonus(employeeId: number, data: Partial<IncentiveBonus>){
    return this._baseHttpService.put(`${this.entityName}/${employeeId}/incentive-bonuses/${data.id}`, data);
  }

  deleteIncentiveBonus(employeeId: number, incentiveBonusId: number){
    return this._baseHttpService.delete(`${this.entityName}/${employeeId}/incentive-bonuses/${incentiveBonusId}`);
  }

  addIncomeTaxExemption(employeeId: number, data: Partial<Exemption>){
    return this._baseHttpService.post(`${this.entityName}/${employeeId}/income-tax-exemptions`, data);
  }

  getIncomeTaxExemption(employeeId: number){
    return this._baseHttpService.get<Partial<Exemption>[] >(`${this.entityName}/${employeeId}/income-tax-exemptions`).pipe(map(data => data));
  }

  updateIncomeTaxExemption(employeeId: number, data: Partial<Exemption>){
    return this._baseHttpService.put(`${this.entityName}/${employeeId}/income-tax-exemptions/${data.id}`, data);
  }

  deleteIncomeTaxExemption(employeeId: number, exemptionId: number){
    return this._baseHttpService.delete(`${this.entityName}/${employeeId}/income-tax-exemptions/${exemptionId}`);
  }
}
