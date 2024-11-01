import type { VanillaCalendar } from '@src/vanilla-calendar';

const Month = (self: VanillaCalendar) => `<button type="button" class="${self.styles.month}" data-vc="month"></button>`;

export default Month;
