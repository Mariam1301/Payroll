import { CommonOptionType } from './general.model';

export interface MonthlySalaryAdjustmentType extends CommonOptionType {
  type: MonthlySalaryAdjustmentTypeEnum;
}

export enum MonthlySalaryAdjustmentTypeEnum {
  BENEFIT = 'benefit',
  DEDUCTION = 'deduction',
}
