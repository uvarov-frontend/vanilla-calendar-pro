import type { Calendar } from '@src/index';

export type NavigationType = 'month' | 'year' | 'week';
export type NavigationRoute = 'prev' | 'next';

export const getCollapseA11y = (self: Calendar) => {
  const expanded = self.context.currentType !== 'week';
  return { expanded, label: expanded ? self.labels.collapse : self.labels.expand };
};

export const getArrowLabel = (self: Calendar, route: NavigationRoute, type: NavigationType) => self.labels[`arrow${route === 'prev' ? 'Prev' : 'Next'}`][type];

const updateNavigationA11y = (self: Calendar, type: NavigationType) => {
  const collapseEl = self.context.mainElement.querySelector<HTMLElement>('[data-vc="collapse"]');
  if (collapseEl) {
    const { expanded, label } = getCollapseA11y(self);
    collapseEl.ariaExpanded = String(expanded);
    collapseEl.ariaLabel = label;
  }

  (['prev', 'next'] as const).forEach((route) => {
    const arrowEl = self.context.mainElement.querySelector<HTMLElement>(`[data-vc-arrow="${route}"]`);
    if (arrowEl) arrowEl.ariaLabel = getArrowLabel(self, route, type);
  });
};

export default updateNavigationA11y;
