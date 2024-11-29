import { GenderEnum } from './general.model';

export interface Employee {
  // id: number;
  // first_name: string;
  // last_name: string;
  // email: string;
  // phone: string;
  // gender: GenderEnum;
  // address: string;
  // position: string;
  // residency: string;
  // company_id: number;
  // user_id: number;
  // personal_number: number;
  // birth_date: Date;
  // bank_account_number: number;
  // work_start_date: Date;
  // salary: Partial<Salary>;
  // isInPension: Boolean;
  id?: number;
  name: string;
  phone?: number | string;
  position: string;
  email: string;
  id_number: number | string;
  surname: string;
  gender: GenderEnum;
  birth_date: Date;
  bank_account: number;
  residency: string;
  address: string;
  start_date: Date;
  end_date?: Date;
  pension: boolean;
}

export interface Salary {
  amount: number;
  currency: CurrencyEnum;
  salaryType: SalaryTypeEnum;
}

export enum CurrencyEnum {
  GEL = 'GEL',
  USD = 'USD',
  EUR = 'EUR',
}

export enum SalaryTypeEnum {
  Gross = 'gross',
  Net = 'net',
}
