import { default as VanillaCalendar } from '../../../vanilla-calendar';
/** Set the calendar picker position according to the user's choice coming from `positionToInput` option. */
declare const setPosition: (input: HTMLInputElement | undefined, calendar: HTMLElement, position: VanillaCalendar['positionToInput']) => void;
export default setPosition;
