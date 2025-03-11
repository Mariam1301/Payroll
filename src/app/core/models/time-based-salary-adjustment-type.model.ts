import { AdjustmentTypeEnum } from './general.model';

export interface TimeBasedSalaryAdjustmentType {
  id: number;
  name: string;
  type: AdjustmentTypeEnum;
  percent: number;
}
