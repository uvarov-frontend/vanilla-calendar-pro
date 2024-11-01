import type { FormatDateString } from '@src/types';
import type VanillaCalendar from '@src/vanilla-calendar';
declare const createDate: (self: VanillaCalendar, currentYear: number, datesEl: HTMLElement, dateID: number, dateStr: FormatDateString, monthType: 'current' | 'prev' | 'next') => void;
export default createDate;
