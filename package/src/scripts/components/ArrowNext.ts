import type { VanillaCalendarPro } from '@src/index';

const ArrowNext = (self: VanillaCalendarPro, type: 'month' | 'year') =>
  `<button type="button" class="${self.styles.arrowNext}" data-vc-arrow="next" aria-label="${self.labels.arrowNext[type]}"></button>`;

export default ArrowNext;
