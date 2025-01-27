export interface PercentageBonus {
  id: number;
  employee_id: number;
  incentive_bonus_type_id: number;
  amount: number;
  date_from: string;
  date_to: string;
}

export interface PercentageBonusInfo {
  id: number;
  employee_name: string;
  employee_surname: string;
  incentive_bonus_type: string;
  amount: number;
  date_from: string;
  date_to: string;
}
