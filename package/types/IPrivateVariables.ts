import type { FormatDateString, ILocale, TypesCalendar } from '../types';

export interface IPrivateVariables {
  isInit: boolean;
  isInputInit: boolean;
  currentType: TypesCalendar;
  locale: ILocale;
  mainElement: HTMLElement;
  originalElement: HTMLElement;
  inputElement?: HTMLInputElement;
  dateMin: Date;
  dateMax: Date;
  displayYear: number;
  displayDateMin: FormatDateString;
  displayDateMax: FormatDateString;
  disableDates: FormatDateString[];
  enableDates: FormatDateString[];
  selectedDates: FormatDateString[];
  selectedMonth: number;
  selectedYear: number;
  selectedHours: string;
  selectedMinutes: string;
  selectedKeeping: string;
  selectedTime: string;
}
