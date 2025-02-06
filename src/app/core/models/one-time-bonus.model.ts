import { CurrencyEnum } from './general.model';

export interface OneTimeBonus {
  id: number;
  employee_id: number;
  amount: number;
  payment_currency: CurrencyEnum;
  calculation_currency: CurrencyEnum;
  includes_income_tax: boolean;
  includes_employee_pension: boolean;
  date_from: string;
  date_to: string;
}

export interface OneTimeBonusInfo {
  id: number;
  employee_name: number;
  employee_surname: number;
  amount: number;
  payment_currency: CurrencyEnum;
  calculation_currency: CurrencyEnum;
  includes_income_tax: boolean;
  includes_employee_pension: boolean;
  date_from: string;
  date_to: string;
}
