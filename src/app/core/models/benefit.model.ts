import {CurrencyEnum} from "./general.model";


export interface Benefit {
  start_date : Date|string;
  end_date : Date|string;
  type: string
  payment_type: string;
  currency: CurrencyEnum;
  amount: number
  id: number
}
