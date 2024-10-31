import type VanillaCalendar from '@src/vanilla-calendar';

const Year = (self: VanillaCalendar) => `<button type="button" class="${self.styles.year}" data-vc="year"></button>`;

export default Year;
