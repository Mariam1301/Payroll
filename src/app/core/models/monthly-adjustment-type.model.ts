export interface MonthlyAdjustmentType {
  type: MonthlyAdjustmentTypeEnum;
  name: string;
  id: number;
}

export enum MonthlyAdjustmentTypeEnum {
  BENEFIT = 'BENEFIT',
  DEDUCTION = 'DEDUCTION',
}
