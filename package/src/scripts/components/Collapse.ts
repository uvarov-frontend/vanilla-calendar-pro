import type { Calendar } from '@src/index';

const Collapse = (self: Calendar) => {
  if (!self.enableCollapse) return '';
  const isCollapsed = self.context.currentType === 'week';
  const label = isCollapsed ? self.labels.expand : self.labels.collapse;
  return `<button type="button" class="${self.styles.collapse}" data-vc="collapse" aria-expanded="${!isCollapsed}" aria-label="${label}"></button>`;
};

export default Collapse;
