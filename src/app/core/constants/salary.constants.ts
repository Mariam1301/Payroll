import {
  DailySalaryCalculationBaseEnum,
  NonWorkingDaysEnum,
  SalaryTypeEnum,
} from '../models/salary.model';

export const SALARY_TYPE_OPTIONS = [
  {
    id: SalaryTypeEnum.Daily,
    label: 'daily',
  },
  {
    id: SalaryTypeEnum.Hourly,
    label: 'hourly',
  },
  {
    id: SalaryTypeEnum.Fixed,
    label: 'monthlyFixed',
  },
  {
    id: SalaryTypeEnum.Shifts,
    label: 'monthlyShifts',
  },
];

export const DAILY_SALARY_CALCULATION_BASE_OPTIONS = [
  {
    id: DailySalaryCalculationBaseEnum.CALENDAR_DAYS,
    label: 'calendarDays',
  },
  {
    id: DailySalaryCalculationBaseEnum.WORKING_DAYS,
    label: 'workingDays',
  },
];

export const NON_WORKING_DAYS_OPTIONS = [
  {
    id: NonWorkingDaysEnum.PUBLIC_HOLIDAYS_UNDER_GEORGIAN_LAW,
    label: 'publicHolidaysUnderGeorgianLaw',
  },
  {
    id: NonWorkingDaysEnum.EVERY_MONDAY,
    label: 'everyMonday',
  },
  {
    id: NonWorkingDaysEnum.EVERY_TUESDAY,
    label: 'everyTuesday',
  },
  {
    id: NonWorkingDaysEnum.EVERY_WEDNESDAY,
    label: 'everyWednesday',
  },
  {
    id: NonWorkingDaysEnum.EVERY_THURSDAY,
    label: 'everyThursday',
  },
  {
    id: NonWorkingDaysEnum.EVERY_FRIDAY,
    label: 'everyFriday',
  },
  {
    id: NonWorkingDaysEnum.EVERY_SATURDAY,
    label: 'everySaturday',
  },
  {
    id: NonWorkingDaysEnum.EVERY_SUNDAY,
    label: 'everySunday',
  },
  {
    id: NonWorkingDaysEnum.CUSTOM_DATES,
    label: 'selectFromCalendar',
  },
];
