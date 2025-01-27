import { GenderEnum } from './general.model';

export interface PayrollGenerationModel {
  date_from: string;
  date_to: string;
  employee_ids: number[];
}

export interface PayrollGenerationInfo {
  employee_name: string;
  employee_surname: string;
  employee_position: string;
  employee_email: string;
  employee_id_number: number | string;
  employee_gender: GenderEnum;
  employee_birth_date: Date;
  employee_bank_account: number;
  employee_residency: string;
  employee_address: string;
  salary: number;
  date_from: string;
  date_to: string;
}
