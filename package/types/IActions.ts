import type { FormatDateString, IVanillaCalendar } from '../types';

export interface IActions {
  clickDay: ((e: MouseEvent, self: IVanillaCalendar) => void) | null;
  clickWeekNumber: ((e: MouseEvent, number: number, days: HTMLElement[], year: number, self: IVanillaCalendar) => void) | null;
  clickWeekDay: ((e: MouseEvent, day: number, days: HTMLElement[], self: IVanillaCalendar) => void) | null;
  clickTitle: ((e: MouseEvent, self: IVanillaCalendar) => void) | null;
  clickMonth: ((e: MouseEvent, self: IVanillaCalendar) => void) | null;
  clickYear: ((e: MouseEvent, self: IVanillaCalendar) => void) | null;
  clickArrow: ((e: MouseEvent, self: IVanillaCalendar) => void) | null;
  changeTime: ((e: Event, self: IVanillaCalendar, isError: boolean) => void) | null;
  changeToInput: ((e: Event, self: IVanillaCalendar) => void) | null;
  getDays: ((day: number, date: FormatDateString, HTMLElement: HTMLElement, HTMLButtonElement: HTMLButtonElement, self: IVanillaCalendar) => void) | null;
  getMonths: ((month: number, HTMLElement: HTMLElement, self: IVanillaCalendar) => void) | null;
  getYears: ((year: number, HTMLElement: HTMLElement, self: IVanillaCalendar) => void) | null;
  initCalendar: ((self: IVanillaCalendar) => void) | null;
  updateCalendar: ((self: IVanillaCalendar) => void) | null;
  destroyCalendar: ((self: IVanillaCalendar) => void) | null;
  showCalendar: ((self: IVanillaCalendar) => void) | null;
  hideCalendar: ((self: IVanillaCalendar) => void) | null;
}
