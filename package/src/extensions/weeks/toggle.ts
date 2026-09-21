import create from '@scripts/creators/create';
import createDates from '@scripts/creators/createDates/createDates';
import visibilityArrows from '@scripts/creators/visibilityArrows';
import setContext from '@scripts/utils/setContext';
import updateNavigationA11y from '@scripts/utils/updateNavigationA11y';
import { getExtensions } from '@src/extension';
import type { Calendar, TypesCalendar } from '@src/index';
import initWeek from './init';

const setType = (self: Calendar, type: TypesCalendar) => {
  self.type = type;
  setContext(self, 'currentType', type);
  create(self);
};

// Keep the control mounted while motion animates the expanded month.
export const prepareCollapse = (self: Calendar) => {
  const { mainElement } = self.context;
  if (!['default', 'week'].includes(self.context.currentType) || mainElement.querySelector('[data-vc-collapsing]')) return null;
  const datesEl = mainElement.querySelector<HTMLElement>('[data-vc="dates"]');
  if (!datesEl) return null;
  const wasCollapsed = self.context.currentType === 'week';
  if (wasCollapsed) {
    self.type = 'default';
    setContext(self, 'currentType', 'default');
    createDates(self);
    visibilityArrows(self);
    updateNavigationA11y(self, 'month');
  } else initWeek(self, true);

  const rows = Array.from(datesEl.querySelectorAll<HTMLElement>('[data-vc-dates="row"]'));
  if (!rows.length) {
    if (wasCollapsed) setType(self, 'week');
    return null;
  }
  const targetRow = rows.find((row) => row.querySelector(`[data-vc-date="${self.context.displayWeekDate}"]`)) ?? rows[0];
  return {
    datesEl,
    rows,
    targetRow,
    wasCollapsed,
    finish(toWeek: boolean) {
      if (self.context.isDestroyed || self.context.mainElement !== mainElement || !datesEl.isConnected) return;
      if (toWeek) return setType(self, 'week');
      if (wasCollapsed) return setType(self, 'default');
      datesEl.removeAttribute('data-vc-collapsing');
    },
  };
};

export const collapseClick = (self: Calendar, event: MouseEvent) => {
  if (!self.enableCollapse || !['default', 'week'].includes(self.context.currentType) || !(event.target as HTMLElement).closest('[data-vc="collapse"]')) return;
  const motion = getExtensions(self).motion;
  if (motion) {
    const transition = motion.collapse(self);
    transition?.settle(transition.from === 0);
    return;
  }
  if (!self.context.mainElement.querySelector('[data-vc="dates"] [data-vc-dates="row"]')) return;
  const toWeek = self.context.currentType !== 'week';
  if (toWeek) initWeek(self, true);
  setType(self, toWeek ? 'week' : 'default');
};
