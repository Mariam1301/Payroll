export interface MonthlyOvertimeType {
  id: number;
  employee_id: number,
  overtime_policy_id: number,
  overtime_hours_worked: number,
  date_from: string,
  date_to: string,
}

export interface MonthlyOvertimeInformation {
  id: number;
  employee_name: string,
  employee_surname:string,
  overtime_type: string,
  overtime_hours_worked: number,
  date_from: string,
  date_to: string,
}
