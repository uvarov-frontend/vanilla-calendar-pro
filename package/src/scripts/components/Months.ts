import escapeHTML from '@scripts/utils/escapeHTML';
import type { Calendar } from '@src/index';

const Months = (self: Calendar) =>
  `<div class="${escapeHTML(self.styles.months)}" data-vc="months" role="grid" aria-label="${escapeHTML(self.labels.months)}"></div>`;

export default Months;
