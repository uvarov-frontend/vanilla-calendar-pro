import messages from '@scripts/helpers/getMessages';
import type VanillaCalendar from '@src/vanilla-calendar';

const Year = (self: VanillaCalendar) =>
  `<button type="button" class="${self.CSSClasses.year}" data-vc="year" aria-label="${messages.ariaLabels.year}"></button>`;

export default Year;
