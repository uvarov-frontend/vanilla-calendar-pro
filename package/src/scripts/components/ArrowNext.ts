import type VanillaCalendar from '@src/vanilla-calendar';

const ArrowNext = (self: VanillaCalendar, type: 'month' | 'year') =>
  `<button type="button" class="${self.CSSClasses.arrowNext}" data-vc-arrow="next" aria-label="${self.locale.ariaLabels.arrowNext[type]}"></button>`;

export default ArrowNext;
