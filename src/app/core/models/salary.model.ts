import { CurrencyEnum } from './general.model';

export interface SalaryModel {
  start_date: Date | string;
  end_date: Date | string;
  type: SalaryTypeEnum;
  includes_income_tax: boolean;
  includes_employee_pension: boolean;
  includes_company_pension: boolean;
  currency: CurrencyEnum;
  amount: number;
  payment_currency: CurrencyEnum;
  id: number;
}

export enum SalaryTypeEnum {
  Daily = 'daily',
  Fixed = 'fixed',
  Hourly = 'hourly',
}
