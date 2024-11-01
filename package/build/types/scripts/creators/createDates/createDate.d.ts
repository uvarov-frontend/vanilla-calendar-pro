import { FormatDateString } from '../../../types';
import { VanillaCalendar } from '../../../vanilla-calendar';
declare const createDate: (self: VanillaCalendar, currentYear: number, datesEl: HTMLElement, dateID: number, dateStr: FormatDateString, monthType: 'current' | 'prev' | 'next') => void;
export default createDate;
