import messages from '@scripts/helpers/getMessages';
import type VanillaCalendar from '@src/vanilla-calendar';

const Years = (self: VanillaCalendar) => `<div class="${self.CSSClasses.years}" data-vc="years" aria-label="${messages.ariaLabels.years}"></div>`;

export default Years;
