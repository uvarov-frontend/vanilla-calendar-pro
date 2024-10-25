import messages from '@scripts/helpers/getMessages';
import type VanillaCalendar from '@src/vanilla-calendar';

const ArrowPrev = (self: VanillaCalendar, type: 'month' | 'year') =>
  `<button type="button" class="${self.CSSClasses.arrowPrev}" data-vc-arrow="prev" aria-label="${messages.ariaLabels.arrowPrev[type]}"></button>`;

export default ArrowPrev;
