import type { Calendar } from '@src/index';

const ArrowPrevFast = (self: Calendar, type: 'month') =>
  `<button type="button" class="${self.styles.arrowPrevFast}" data-vc-arrow-fast="prev" aria-label="${self.labels.arrowPrevFast[type]}"></button>`;

export default ArrowPrevFast;
