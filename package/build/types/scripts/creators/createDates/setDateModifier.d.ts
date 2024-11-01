import type { FormatDateString, WeekDayID } from '@src/types';
import type VanillaCalendar from '@src/vanilla-calendar';
declare const setDateModifier: (self: VanillaCalendar, currentYear: number, dateEl: HTMLElement, dateBtnEl: HTMLButtonElement, dayWeekID: WeekDayID, dateStr: FormatDateString, monthType: 'current' | 'prev' | 'next') => void;
export default setDateModifier;
