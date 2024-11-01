import { default as VanillaCalendar } from '../../../vanilla-calendar';
declare const handleRange: (self: VanillaCalendar, rangeEl: HTMLInputElement, inputEl: HTMLInputElement, keepingTimeEl: HTMLButtonElement | null, type: 'hour' | 'minute') => () => void;
export default handleRange;
