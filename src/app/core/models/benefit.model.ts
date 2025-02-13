import { MonthlyAdjustmentTypeComponent } from '../../features/company-page/monthly-adjustment-type/montly-adjustment-type.component';
import { CurrencyEnum } from './general.model';

export interface Benefit {
  start_date: Date | string;
  end_date: Date | string;
  type: MonthlyAdjustmentTypeComponent;
  includes_income_tax: boolean;
  includes_employee_pension: boolean;
  payment_currency: CurrencyEnum;
  calculation_currency: CurrencyEnum;
  amount: number;
  id: number;
}
