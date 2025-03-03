import { CommonOptionType, GenderEnum } from './general.model';

export interface PayrollGenerationModel {
  start_date: string;
  end_date: string;
  employee_ids: number[];
  prorate_adjustments: number[];
  regular_adjustments: number[];
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

export interface PayrollConfigurationField extends CommonOptionType {
  includeInCalculation: boolean;
  isProportional: boolean;
}

export interface PayrollTableField<T, V> {
  name: T;
  valueField: V;
}

export enum PayrollGeneralInformationFieldName {
  NAME = 'name',
  LAST_NAME = 'lastName',
  START_DATE = 'startDate',
  END_DATE = 'endDate',
  PERSONAL_NUMBER = 'personalNumber',
  BIRTH_DATE = 'birthDate',
  PHONE_NUMBER = 'phoneNumber',
  GENDER = 'gender',
  ADDRESS = 'address',
  TAX_RESIDENCY = 'taxResidency',
  EMAIL = 'email',
  BANK_ACCOUNT_NUMBER = 'bankAccountNumber',
  IS_IN_PENSION = 'isInPension',
  POSITION = 'position',
}

export enum PayrollGeneralInformationValueField {
  NAME = 'name',
  LAST_NAME = 'surname',
  START_DATE = 'start_date',
  END_DATE = 'end_date',
  PERSONAL_NUMBER = 'id_number',
  BIRTH_DATE = 'birth_date',
  PHONE_NUMBER = 'phone_number',
  GENDER = 'gender',
  ADDRESS = 'address',
  TAX_RESIDENCY = 'residency',
  EMAIL = 'email',
  BANK_ACCOUNT_NUMBER = 'bank_account',
  IS_IN_PENSION = 'pension',
  POSITION = 'position',
}

export enum PayrollSalaryFieldName {
  GROSS_SALARY = 'grossSalary',
  TOTAL_GROSS_BENEFITS = 'totalGrossBenefits',
  TOTAL_GROSS_DEDUCTIONS = 'totalGrossDeductions',
  SUM_COMPENSATION_GROSS = 'sumCompensationGross',
  PENSION_CONTRIBUTION = 'salaryPensionContribution',
  INCOME_TAX_CONTRIBUTION = 'salaryIncomeTaxContribution',
  NET_SALARY = 'netSalary',
  ONE_TIME_BENEFIT = 'oneTimeBenefit',
  ONE_TIME_DEDUCTION = 'oneTimeDeduction',
}

export enum PayrollSalaryValueField {
  GROSS_SALARY = 'salary_gross',
  TOTAL_GROSS_BENEFITS = 'sum_benefits_gross',
  TOTAL_GROSS_DEDUCTIONS = 'sum_deduction_gross',
  SUM_COMPENSATION_GROSS = 'sum_amount',
  PENSION_CONTRIBUTION = 'salary_pension',
  INCOME_TAX_CONTRIBUTION = 'salary_income_tax',
  NET_SALARY = 'salary_net',
  ONE_TIME_BENEFIT = 'one_time_benefit_gross',
  ONE_TIME_DEDUCTION = 'one_time_deduction_gross',
}
