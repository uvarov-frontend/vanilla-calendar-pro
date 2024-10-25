import messages from '@scripts/helpers/getMessages';
import type VanillaCalendar from '@src/vanilla-calendar';

const Month = (self: VanillaCalendar) =>
  `<button type="button" class="${self.CSSClasses.month}" data-vc="month" aria-label="${messages.ariaLabels.month}"></button>`;

export default Month;
