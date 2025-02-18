import { CurrencyEnum } from './general.model';

export interface IncentiveBonus {
  start_date: Date | string | null;
  end_date: Date | string | null;
  type: string;
  includes_income_tax: boolean;
  includes_employee_pension: boolean;
  payment_currency: CurrencyEnum;
  calculation_currency: CurrencyEnum;
  percent: number;
  id: number;
}
