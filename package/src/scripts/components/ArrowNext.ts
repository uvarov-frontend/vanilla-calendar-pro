import escapeHTML from '@scripts/utils/escapeHTML';
import { getArrowLabel, type NavigationType } from '@scripts/utils/updateNavigationA11y';
import type { Calendar } from '@src/index';

const ArrowNext = (self: Calendar, type: NavigationType) =>
  `<button type="button" class="${escapeHTML(self.styles.arrowNext)}" data-vc-arrow="next" aria-label="${escapeHTML(getArrowLabel(self, 'next', type))}"></button>`;

export default ArrowNext;
