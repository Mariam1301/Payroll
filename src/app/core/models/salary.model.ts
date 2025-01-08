import { CurrencyEnum, PaymentTypeEnum } from './general.model';

export interface SalaryModel {
  start_date: Date | string;
  end_date: Date | string;
  type: SalaryTypeEnum;
  payment_type: PaymentTypeEnum;
  currency: CurrencyEnum;
  amount: number;
  id: number;
}

export enum SalaryTypeEnum {
  Daily = 'daily',
  Fixed = 'fixed',
  Hourly = 'hourly',
}
