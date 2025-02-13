import { CommonOptionType, CurrencyEnum } from './general.model';

export interface MonthlyAdjustment {
  start_date: Date | string;
  end_date: Date | string;
  type: CommonOptionType;
  includes_income_tax: boolean;
  includes_employee_pension: boolean;
  payment_currency: CurrencyEnum;
  calculation_currency: CurrencyEnum;
  amount: number;
  id: number;
}
