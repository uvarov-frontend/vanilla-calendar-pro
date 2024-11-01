import type VanillaCalendar from '@src/vanilla-calendar';
declare const handleInput: (self: VanillaCalendar, rangeEl: HTMLInputElement, inputEl: HTMLInputElement, keepingTimeEl: HTMLButtonElement | null, type: 'hour' | 'minute', max: number, min: number) => () => void;
export default handleInput;
