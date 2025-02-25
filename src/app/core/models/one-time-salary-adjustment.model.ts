import { AdjustmentTypeEnum, CurrencyEnum } from './general.model';

export interface OneTimeSalaryAdjustment {
  id: number;
  employee_id: number;
  adjustment_type: AdjustmentTypeEnum;
  amount: number;
  calculation_currency: CurrencyEnum;
  includes_income_tax: boolean;
  includes_employee_pension: boolean;
  date: string;
  comment: string;
}

export interface OneTimeSalaryAdjustmentDialogInfo {
  oneTimeSalaryAdjustment: OneTimeSalaryAdjustment;
}
