import type { Calendar } from '@src/index';

const ArrowNextFast = (self: Calendar, type: 'month') =>
  `<button type="button" class="${self.styles.arrowNextFast}" data-vc-arrow-fast="next" aria-label="${self.labels.arrowNextFast[type]}"></button>`;

export default ArrowNextFast;
