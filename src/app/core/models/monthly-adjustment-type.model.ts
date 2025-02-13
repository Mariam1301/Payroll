import { CommonOptionType } from './general.model';

export interface MonthlyAdjustmentType extends CommonOptionType {
  type: MonthlyAdjustmentTypeEnum;
}

export enum MonthlyAdjustmentTypeEnum {
  BENEFIT = 'BENEFIT',
  DEDUCTION = 'DEDUCTION',
}
