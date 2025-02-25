import { AdjustmentTypeEnum, CurrencyEnum } from '../models/general.model';

export const ADJUSTMENT_TYPES = [
  {
    id: AdjustmentTypeEnum.BENEFIT,
    label: 'benefit',
  },
  {
    id: AdjustmentTypeEnum.DEDUCTION,
    label: 'deduction',
  },
];

export const CURRENCY_OPTIONS = [
  {
    id: CurrencyEnum.GEL,
    label: 'GEL',
  },
  {
    id: CurrencyEnum.EUR,
    label: 'EUR',
  },
  {
    id: CurrencyEnum.USD,
    label: 'USD',
  },
];
