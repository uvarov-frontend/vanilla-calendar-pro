import type { IVanillaCalendar } from '../types';

export interface IActions {
  onClickDate?: (e: MouseEvent, self: IVanillaCalendar) => void;
  onClickWeekDay?: (e: MouseEvent, day: number, days: HTMLElement[], self: IVanillaCalendar) => void;
  onClickWeekNumber?: (e: MouseEvent, number: number, days: HTMLElement[], year: number, self: IVanillaCalendar) => void;
  onClickTitle?: (e: MouseEvent, self: IVanillaCalendar) => void;
  onClickMonth?: (e: MouseEvent, self: IVanillaCalendar) => void;
  onClickYear?: (e: MouseEvent, self: IVanillaCalendar) => void;
  onClickArrow?: (e: MouseEvent, self: IVanillaCalendar) => void;
  onChangeTime?: (e: Event, self: IVanillaCalendar, isError: boolean) => void;
  onChangeToInput?: (e: Event, self: IVanillaCalendar) => void;
  onInit?: (self: IVanillaCalendar) => void;
  onUpdate?: (self: IVanillaCalendar) => void;
  onDestroy?: (self: IVanillaCalendar) => void;
  onShow?: (self: IVanillaCalendar) => void;
  onHide?: (self: IVanillaCalendar) => void;

  // getDays: (day: number, date: FormatDateString, HTMLElement: HTMLElement, HTMLButtonElement: HTMLButtonElement, self: IVanillaCalendar) => void) | null;
  // getMonths: (month: number, HTMLElement: HTMLElement, self: IVanillaCalendar) => void) | null;
  // getYears: (year: number, HTMLElement: HTMLElement, self: IVanillaCalendar) => void) | null;
}
