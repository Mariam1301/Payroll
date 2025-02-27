import { AdjustmentTypeEnum, CurrencyEnum } from './general.model';

export interface OneTimeSalaryAdjustment {
  id: number;
  employee_id: number;
  type: AdjustmentTypeEnum;
  amount: number;
  employee_name: string;
  employee_surname: string;
  calculation_currency: CurrencyEnum;
  includes_income_tax: boolean;
  includes_employee_pension: boolean;
  date: string;
  description: string;
}

export interface OneTimeSalaryAdjustmentDialogInfo {
  oneTimeSalaryAdjustment: OneTimeSalaryAdjustment;
}
