import { CurrencyEnum } from './general.model';

export interface MonthlySalaryAdjustment {
  id: number;
  monthly_salary_adjustment_id: number;
  start_date: Date | string | null;
  end_date: Date | string | null;
  includes_income_tax: boolean;
  includes_employee_pension: boolean;
  includes_company_pension: boolean;
  calculation_currency: CurrencyEnum;
  amount: number;
}
