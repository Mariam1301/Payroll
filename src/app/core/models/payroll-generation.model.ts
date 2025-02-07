import { CurrencyEnum, GenderEnum } from './general.model';
import { SalaryTypeEnum } from './salary.model';

export interface PayrollGenerationModel {
  start_date: string;
  end_date: string;
  employee_ids: number[];
}

export interface PayrollCalculationResultModel {
  salary_gross: number;
  salary_pension: number;
  salary_income_tax: number;
  salary_net: number;
  benefit_gross: number;
  benefit_pension: number;
  benefit_income_tax: number;
  benefit_net: number;
  deduction_gross: number;
  deduction_pension: number;
  deduction_income_tax: number;
  deduction_net: number;
  employee_id: number;
  company_id: number;
  user_id: number | null;
  position: string | null;
  name: string;
  email: string;
  phone: string | null;
  id_number: string | null;
  surname: string;
  gender: GenderEnum;
  birth_date: string | null;
  bank_account: string | null;
  residency: string | null;
  address: string | null;
  start_date: string | null;
  end_date: string | null;
  pension: number | null;
}
