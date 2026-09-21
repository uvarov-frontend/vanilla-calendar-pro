import escapeHTML from '@scripts/utils/escapeHTML';
import type { Calendar } from '@src/index';

const Dates = (self: Calendar) =>
  `<div class="${escapeHTML(self.styles.dates)}" data-vc="dates" role="rowgroup" aria-label="${escapeHTML(self.labels.dates)}"></div>`;

export default Dates;
