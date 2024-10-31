import type { WeekDayID, WeekDays } from '../types';

export interface ISelected {
  month?: number;
  year?: number;
  dates?: Array<Date | number | string>;
  holidays?: Array<Date | number | string>;
  weekend?: WeekDays<WeekDayID>;
  time?: string;
}
