import messages from '@scripts/helpers/getMessages';
import type VanillaCalendar from '@src/vanilla-calendar';

const Dates = (self: VanillaCalendar) => `<div class="${self.CSSClasses.dates}" data-vc="dates" aria-label="${messages.ariaLabels.dates}"></div>`;

export default Dates;
