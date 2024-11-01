import { VanillaCalendarPro } from '../../../index';
import { FormatDateString } from '../../../types';
declare const createDate: (self: VanillaCalendarPro, currentYear: number, datesEl: HTMLElement, dateID: number, dateStr: FormatDateString, monthType: 'current' | 'prev' | 'next') => void;
export default createDate;
