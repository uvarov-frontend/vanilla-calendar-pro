import { Reset } from '../../types';
import { default as VanillaCalendar } from '../../vanilla-calendar';
declare const reset: (self: VanillaCalendar, { year, month, dates, time, locale }?: Reset) => void;
export default reset;
