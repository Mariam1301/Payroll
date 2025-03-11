export interface TimeBasedSalaryAdjustment {
  id: number;
  employee_id: number;
  type: number;
  day: number;
  hour: number;
  minute: number;
  date: string;
}

export interface TimeBasedSalaryAdjustmentDialogInfo {
  oneTimeSalaryAdjustment: TimeBasedSalaryAdjustment;
}
