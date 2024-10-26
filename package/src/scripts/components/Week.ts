import type VanillaCalendar from '@src/vanilla-calendar';

const Week = (self: VanillaCalendar) => `<div class="${self.CSSClasses.week}" data-vc="week" role="row" aria-label="${self.locale.ariaLabels.week}"></div>`;

export default Week;
