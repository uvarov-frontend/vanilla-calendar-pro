import { VanillaCalendarPro } from '../../../index';
import { FormatDateString, WeekDayID } from '../../../types';
declare const setDateModifier: (self: VanillaCalendarPro, currentYear: number, dateEl: HTMLElement, dateBtnEl: HTMLButtonElement, dayWeekID: WeekDayID, dateStr: FormatDateString, monthType: 'current' | 'prev' | 'next') => void;
export default setDateModifier;
