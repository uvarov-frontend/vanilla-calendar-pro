import messages from '@scripts/helpers/getMessages';
import type VanillaCalendar from '@src/vanilla-calendar';

const Week = (self: VanillaCalendar) => `<div class="${self.CSSClasses.week}" data-vc="week" aria-label="${messages.ariaLabels.week}"></div>`;

export default Week;
