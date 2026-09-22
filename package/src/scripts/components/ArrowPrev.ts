import escapeHTML from '@scripts/utils/escapeHTML';
import { getArrowLabel, type NavigationType } from '@scripts/utils/updateNavigationA11y';
import type { Calendar } from '@src/index';

const ArrowPrev = (self: Calendar, type: NavigationType) =>
  `<button type="button" class="${escapeHTML(self.styles.arrowPrev)}" data-vc-arrow="prev" aria-label="${escapeHTML(getArrowLabel(self, 'prev', type))}"></button>`;

export default ArrowPrev;
