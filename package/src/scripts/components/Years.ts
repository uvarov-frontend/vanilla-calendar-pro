import escapeHTML from '@scripts/utils/escapeHTML';
import type { Calendar } from '@src/index';

const Years = (self: Calendar) =>
  `<div class="${escapeHTML(self.styles.years)}" data-vc="years" role="grid" aria-label="${escapeHTML(self.labels.years)}"></div>`;

export default Years;
