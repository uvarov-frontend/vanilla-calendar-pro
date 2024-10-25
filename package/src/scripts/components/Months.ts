import messages from '@scripts/helpers/getMessages';
import type VanillaCalendar from '@src/vanilla-calendar';

const Months = (self: VanillaCalendar) => `<div class="${self.CSSClasses.months}" data-vc="months" aria-label="${messages.ariaLabels.months}"></div>`;

export default Months;
