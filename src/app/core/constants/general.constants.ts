import {
  AdjustmentTypeEnum,
  CurrencyEnum,
  GenderEnum,
} from '../models/general.model';

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

export const GENDER_OPTIONS = [
  {
    id: GenderEnum.Female,
    label: 'female',
  },
  {
    id: GenderEnum.Male,
    label: 'male',
  },
];
