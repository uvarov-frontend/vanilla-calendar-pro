import { getCollapseA11y } from '@scripts/utils/updateNavigationA11y';
import type { Calendar } from '@src/index';

const Collapse = (self: Calendar) => {
  if (!self.enableCollapse) return '';
  const { expanded, label } = getCollapseA11y(self);
  return `<button type="button" class="${self.styles.collapse}" data-vc="collapse" aria-expanded="${expanded}" aria-label="${label}"></button>`;
};

export default Collapse;
