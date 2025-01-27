import { CurrencyEnum } from './general.model';

export interface OneTimeDeduction {
  id: number;
  employee_id: number;
  amount: number;
  payment_currency: CurrencyEnum;
  calculation_currency: CurrencyEnum;
  includes_income_tax: boolean;
  includes_employee_pension: boolean;
  includes_company_pension: boolean;
  date_from: string;
  date_to: string;
}

export interface OneTimeDeductionInfo {
  id: number;
  employee_name: number;
  employee_surname: number;
  amount: number;
  payment_currency: CurrencyEnum;
  calculation_currency: CurrencyEnum;
  includes_income_tax: boolean;
  includes_employee_pension: boolean;
  includes_company_pension: boolean;
  date_from: string;
  date_to: string;
}
