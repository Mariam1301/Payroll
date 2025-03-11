export interface Exemption {
  id: number;
  name: string;
  start_date?: string | null;
  end_date?: string | null;
  renewable: boolean;
  amount: number;
  percent: number;
  constant: boolean;
  balance_amount: number;
  balance_date: string | null;
}
