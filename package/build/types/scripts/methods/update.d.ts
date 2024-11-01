import type { Reset } from '@src/types';
import type VanillaCalendar from '@src/vanilla-calendar';
declare const update: (self: VanillaCalendar, { year, month, dates, time, locale }?: Reset) => void;
export default update;
