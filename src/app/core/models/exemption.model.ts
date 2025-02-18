import { CurrencyEnum } from './general.model';

export interface Exemption {
  id: number;
  type: string;
  limit_type: LimitType;
  end_date?: string | null;
  start_date?: string | null;
  amount?: number;
  currency?: CurrencyEnum;
}

export enum LimitType {
  TIME_BASED = 'TIME_BASED',
  AMOUNT_BASED = 'AMOUNT_BASED',
  PEMANENT = 'PEMANENT',
}
