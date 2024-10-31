import type VanillaCalendar from '@src/vanilla-calendar';

const Week = (self: VanillaCalendar) => `<div class="${self.styles.week}" data-vc="week" role="row" aria-label="${self.labels.week}"></div>`;

export default Week;
