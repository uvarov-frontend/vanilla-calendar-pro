import type VanillaCalendar from '@src/vanilla-calendar';

export const Year = (self: VanillaCalendar) => `<button type="button" class="${self.CSSClasses.year}" data-vc="year"></button>`;

export default Year;
