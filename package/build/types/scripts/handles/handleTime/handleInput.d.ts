import { VanillaCalendarPro } from '../../../index';
declare const handleInput: (self: VanillaCalendarPro, rangeEl: HTMLInputElement, inputEl: HTMLInputElement, keepingTimeEl: HTMLButtonElement | null, type: 'hour' | 'minute', max: number, min: number) => () => void;
export default handleInput;
