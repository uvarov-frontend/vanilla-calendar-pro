import type { VanillaCalendarPro } from '@src/index';

const Week = (self: VanillaCalendarPro) => `<div class="${self.styles.week}" data-vc="week" role="row" aria-label="${self.labels.week}"></div>`;

export default Week;
