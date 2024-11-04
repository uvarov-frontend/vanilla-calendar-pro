import layoutDefault from '@scripts/layouts/layoutDefault';
import layoutMonths from '@scripts/layouts/layoutMonths';
import layoutMultiple from '@scripts/layouts/layoutMultiple';
import layoutYears from '@scripts/layouts/layoutYears';
import { parseLayout, parseMultipleLayout } from '@scripts/utils/parseComponent';
import type { VanillaCalendarPro } from '@src/index';

const createLayouts = (self: VanillaCalendarPro, target?: HTMLElement) => {
  const templateMap = {
    default: layoutDefault,
    month: layoutMonths,
    year: layoutYears,
    multiple: layoutMultiple,
  };

  Object.keys(templateMap).forEach((key) => {
    const typedKey = key as keyof typeof templateMap;
    if (!self.layouts[typedKey].length) self.layouts[typedKey] = templateMap[typedKey](self);
  });

  self.private.mainElement.className = self.styles.calendar;
  self.private.mainElement.dataset.vc = 'calendar';
  self.private.mainElement.dataset.vcType = self.private.currentType;
  self.private.mainElement.role = 'application';
  self.private.mainElement.tabIndex = 0;
  self.private.mainElement.ariaLabel = self.labels.application;

  if (self.private.currentType === 'multiple') {
    self.private.mainElement.innerHTML = parseMultipleLayout(self, parseLayout(self, self.layouts[self.private.currentType]));
    return;
  }

  if (self.viewType === 'multiple' && target) {
    const controlsEl = self.private.mainElement.querySelector<HTMLElement>('[data-vc="controls"]');
    const gridEl = self.private.mainElement.querySelector<HTMLElement>('[data-vc="grid"]');
    const columnEl = target.closest<HTMLElement>('[data-vc="column"]');

    if (controlsEl) self.private.mainElement.removeChild(controlsEl);
    if (gridEl) gridEl.dataset.vcGrid = 'hidden';
    if (columnEl) columnEl.dataset.vcColumn = self.private.currentType;
    if (columnEl) columnEl.innerHTML = parseLayout(self, self.layouts[self.private.currentType]);
    return;
  }

  self.private.mainElement.innerHTML = parseLayout(self, self.layouts[self.private.currentType]);
};

export default createLayouts;
