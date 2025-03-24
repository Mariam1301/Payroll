import { CurrencyEnum } from './general.model';

export interface InitialSalaryBalance {
  id: number;
  amount: number;
  currency: CurrencyEnum;
  includes_income_tax: boolean;
  includes_employee_pension: boolean;
}
