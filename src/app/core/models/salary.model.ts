import { CurrencyEnum } from './general.model';

export interface SalaryModel {
  start_date: Date | string;
  end_date: Date | string;
  type: SalaryTypeEnum;
  includes_income_tax: boolean;
  includes_employee_pension: boolean;
  calculation_currency: CurrencyEnum;
  amount: number;
  payment_currency: CurrencyEnum;
  id: number;
  daily_salary_calculation_base: DailySalaryCalculationBaseEnum;
  daily_working_hours?: number;
  monthly_working_days?: number;
  non_working_days: NonWorkingDaysEnum[];
  non_working_custom_dates?: string[];
}

export enum SalaryTypeEnum {
  Daily = 'daily',
  Fixed = 'monthly_fixed',
  Shifts = 'monthly_shifts',
  Hourly = 'hourly',
}

export enum DailySalaryCalculationBaseEnum {
  CALENDAR_DAYS = 'CALENDAR_DAYS',
  WORKING_DAYS = 'WORKING_DAYS',
}

export enum NonWorkingDaysEnum {
  PUBLIC_HOLIDAYS_UNDER_GEORGIAN_LAW = 'PUBLIC_HOLIDAYS_UNDER_GEORGIAN_LAW',
  EVERY_MONDAY = 'EVERY_MONDAY',
  EVERY_TUESDAY = 'EVERY_TUESDAY',
  EVERY_WEDNESDAY = 'EVERY_WEDNESDAY',
  EVERY_THURSDAY = 'EVERY_THURSDAY',
  EVERY_FRIDAY = 'EVERY_FRIDAY',
  EVERY_SATURDAY = 'EVERY_SATURDAY',
  EVERY_SUNDAY = 'EVERY_SUNDAY',
  CUSTOM_DATES = 'CUSTOM_DATES',
}
