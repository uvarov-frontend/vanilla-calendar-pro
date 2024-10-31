import type VanillaCalendar from '@src/vanilla-calendar';

const ArrowNext = (self: VanillaCalendar, type: 'month' | 'year') =>
  `<button type="button" class="${self.styles.arrowNext}" data-vc-arrow="next" aria-label="${self.labels.arrowNext[type]}"></button>`;

export default ArrowNext;
