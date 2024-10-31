import type VanillaCalendar from '@src/vanilla-calendar';

const Months = (self: VanillaCalendar) =>
  `<div class="${self.styles.months}" data-vc="months" role="grid" aria-live="assertive" aria-label="${self.labels.months}"></div>`;

export default Months;