import type { VanillaCalendarPro } from '@src/index';

const Months = (self: VanillaCalendarPro) =>
  `<div class="${self.styles.months}" data-vc="months" role="grid" aria-live="assertive" aria-label="${self.labels.months}"></div>`;

export default Months;
