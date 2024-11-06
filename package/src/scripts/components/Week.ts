import type { Calendar } from '@src/index';

const Week = (self: Calendar) => `<div class="${self.styles.week}" data-vc="week" role="row" aria-label="${self.labels.week}"></div>`;

export default Week;
