import escapeHTML from '@scripts/utils/escapeHTML';
import type { Calendar } from '@src/index';

const Week = (self: Calendar) => `<div class="${escapeHTML(self.styles.week)}" data-vc="week" role="row" aria-label="${escapeHTML(self.labels.week)}"></div>`;

export default Week;
