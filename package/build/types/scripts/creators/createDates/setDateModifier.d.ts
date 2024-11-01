import { FormatDateString, WeekDayID } from '../../../types';
import { default as VanillaCalendar } from '../../../vanilla-calendar';
declare const setDateModifier: (self: VanillaCalendar, currentYear: number, dateEl: HTMLElement, dateBtnEl: HTMLButtonElement, dayWeekID: WeekDayID, dateStr: FormatDateString, monthType: 'current' | 'prev' | 'next') => void;
export default setDateModifier;
