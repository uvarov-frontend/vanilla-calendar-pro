import type { Calendar } from '@src/index';

const Months = (self: Calendar) =>
  `<div class="${self.styles.months}" data-vc="months" role="grid" aria-label="${self.labels.months}"></div>`;

export default Months;
