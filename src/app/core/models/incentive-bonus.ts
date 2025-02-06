import { CurrencyEnum } from './general.model';

export interface IncentiveBonus {
  start_date: Date | string;
  end_date: Date | string;
  type: string;
  includes_income_tax: boolean;
  includes_employee_pension: boolean;
  payment_currency: CurrencyEnum;
  calculation_currency: CurrencyEnum;
  percent: number;
  id: number;
}
