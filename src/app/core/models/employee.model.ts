import { GenderEnum } from './general.model';

export interface Employee {
  id: number;
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

