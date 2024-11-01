import type { VanillaCalendar } from '@src/vanilla-calendar';

const Years = (self: VanillaCalendar) =>
  `<div class="${self.styles.years}" data-vc="years" role="grid" aria-live="assertive" aria-label="${self.labels.years}"></div>`;

export default Years;
