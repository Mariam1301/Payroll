import {CurrencyEnum} from "./general.model";

export interface OvertimePolicy {
  type: string;
  includes_income_tax: boolean;
  includes_employee_pension: boolean;
  includes_company_pension: boolean;
  payment_currency: CurrencyEnum;
  calculation_currency: CurrencyEnum;
  percent: number;
  id: number;
}
