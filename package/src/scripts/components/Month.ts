import escapeHTML from '@scripts/utils/escapeHTML';
import type { Calendar } from '@src/index';

const Month = (self: Calendar) => `<button type="button" class="${escapeHTML(self.styles.month)}" data-vc="month"></button>`;

export default Month;
