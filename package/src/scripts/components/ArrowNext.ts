import messages from '@scripts/helpers/getMessages';
import type VanillaCalendar from '@src/vanilla-calendar';

const ArrowNext = (self: VanillaCalendar, type: 'month' | 'year') =>
  `<button type="button" class="${self.CSSClasses.arrowNext}" data-vc-arrow="next" aria-label="${messages.ariaLabels.arrowNext[type]}"></button>`;

export default ArrowNext;
