import type { Calendar } from '@src/index';

const ArrowPrev = (self: Calendar, type: 'month' | 'year') =>
  `<button type="button" class="${self.styles.arrowPrev}" data-vc-arrow="prev" aria-label="${self.labels.arrowPrev[type]}"></button>`;

export default ArrowPrev;
