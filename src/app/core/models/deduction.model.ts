import { CurrencyEnum } from './general.model';

export interface Deduction {
  start_date: Date | string;
  end_date: Date | string;
  type: string;
  includes_income_tax: boolean;
  includes_employee_pension: boolean;
  includes_company_pension: boolean;
  payment_currency: CurrencyEnum;
  calculation_currency: CurrencyEnum;
  amount: number;
  id: number;
}
