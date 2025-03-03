import {
  PayrollGeneralInformationFieldName,
  PayrollGeneralInformationValueField,
  PayrollSalaryFieldName,
  PayrollSalaryValueField,
  PayrollTableField,
} from '../models/payroll-generation.model';

export const EMPLOYEE_GENERAL_INFORMATION_FIELDS: PayrollTableField<
  PayrollGeneralInformationFieldName,
  PayrollGeneralInformationValueField
>[] = [
  {
    name: PayrollGeneralInformationFieldName.NAME,
    valueField: PayrollGeneralInformationValueField.NAME,
  },
  {
    name: PayrollGeneralInformationFieldName.LAST_NAME,
    valueField: PayrollGeneralInformationValueField.LAST_NAME,
  },
  {
    name: PayrollGeneralInformationFieldName.START_DATE,
    valueField: PayrollGeneralInformationValueField.START_DATE,
  },
  {
    name: PayrollGeneralInformationFieldName.END_DATE,
    valueField: PayrollGeneralInformationValueField.END_DATE,
  },
  {
    name: PayrollGeneralInformationFieldName.BIRTH_DATE,
    valueField: PayrollGeneralInformationValueField.BIRTH_DATE,
  },
  {
    name: PayrollGeneralInformationFieldName.PHONE_NUMBER,
    valueField: PayrollGeneralInformationValueField.PHONE_NUMBER,
  },
  {
    name: PayrollGeneralInformationFieldName.EMAIL,
    valueField: PayrollGeneralInformationValueField.EMAIL,
  },
  {
    name: PayrollGeneralInformationFieldName.PERSONAL_NUMBER,
    valueField: PayrollGeneralInformationValueField.PERSONAL_NUMBER,
  },
  {
    name: PayrollGeneralInformationFieldName.POSITION,
    valueField: PayrollGeneralInformationValueField.POSITION,
  },
  {
    name: PayrollGeneralInformationFieldName.GENDER,
    valueField: PayrollGeneralInformationValueField.GENDER,
  },
  {
    name: PayrollGeneralInformationFieldName.ADDRESS,
    valueField: PayrollGeneralInformationValueField.ADDRESS,
  },
  {
    name: PayrollGeneralInformationFieldName.TAX_RESIDENCY,
    valueField: PayrollGeneralInformationValueField.TAX_RESIDENCY,
  },
  {
    name: PayrollGeneralInformationFieldName.BANK_ACCOUNT_NUMBER,
    valueField: PayrollGeneralInformationValueField.BANK_ACCOUNT_NUMBER,
  },
  {
    name: PayrollGeneralInformationFieldName.IS_IN_PENSION,
    valueField: PayrollGeneralInformationValueField.IS_IN_PENSION,
  },
];

export const PAYROLL_SALARY_FIELDS: PayrollTableField<
  PayrollSalaryFieldName,
  PayrollSalaryValueField
>[] = [
  {
    name: PayrollSalaryFieldName.GROSS_SALARY,
    valueField: PayrollSalaryValueField.GROSS_SALARY,
  },
  {
    name: PayrollSalaryFieldName.TOTAL_GROSS_BENEFITS,
    valueField: PayrollSalaryValueField.TOTAL_GROSS_BENEFITS,
  },
  {
    name: PayrollSalaryFieldName.TOTAL_GROSS_DEDUCTIONS,
    valueField: PayrollSalaryValueField.TOTAL_GROSS_DEDUCTIONS,
  },
  {
    name: PayrollSalaryFieldName.SUM_COMPENSATION_GROSS,
    valueField: PayrollSalaryValueField.SUM_COMPENSATION_GROSS,
  },
  {
    name: PayrollSalaryFieldName.PENSION_CONTRIBUTION,
    valueField: PayrollSalaryValueField.PENSION_CONTRIBUTION,
  },
  {
    name: PayrollSalaryFieldName.INCOME_TAX_CONTRIBUTION,
    valueField: PayrollSalaryValueField.INCOME_TAX_CONTRIBUTION,
  },
  {
    name: PayrollSalaryFieldName.NET_SALARY,
    valueField: PayrollSalaryValueField.NET_SALARY,
  },
  {
    name: PayrollSalaryFieldName.ONE_TIME_BENEFIT,
    valueField: PayrollSalaryValueField.ONE_TIME_BENEFIT,
  },
  {
    name: PayrollSalaryFieldName.ONE_TIME_DEDUCTION,
    valueField: PayrollSalaryValueField.ONE_TIME_DEDUCTION,
  },
];
