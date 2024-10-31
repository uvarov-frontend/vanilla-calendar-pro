import layoutDefault from '@scripts/layouts/layoutDefault';
import layoutMonths from '@scripts/layouts/layoutMonths';
import layoutMultiple from '@scripts/layouts/layoutMultiple';
import layoutYears from '@scripts/layouts/layoutYears';
import getCorrectNumberOfMonths from '@scripts/utils/getCorrectNumberOfMonths';
import { parseLayout, parseMultipleLayout } from '@scripts/utils/parseComponent';
import type VanillaCalendar from '@src/vanilla-calendar';

const createLayouts = (self: VanillaCalendar, target?: HTMLElement) => {
  const templateMap = {
    default: layoutDefault,
    month: layoutMonths,
    year: layoutYears,
    multiple: layoutMultiple,
  };

  Object.keys(templateMap).forEach((key) => {
    const typedKey = key as keyof typeof templateMap;
    if (!self.layouts[typedKey].length) {
      self.layouts[typedKey] = templateMap[typedKey](self);
    }
  });

  self.HTMLElement.className = self.styles.calendar;
  self.HTMLElement.dataset.vc = 'calendar';
  self.HTMLElement.dataset.vcType = self.private.currentType;
  self.HTMLElement.role = 'application';
  self.HTMLElement.tabIndex = 0;
  self.HTMLElement.ariaLabel = self.labels.application;

  if (self.private.currentType === 'multiple' && getCorrectNumberOfMonths(self)) {
    self.HTMLElement.innerHTML = parseMultipleLayout(self, parseLayout(self, self.layouts[self.private.currentType]));
    return;
  }

  if (self.type === 'multiple' && target) {
    const controlsEl = self.HTMLElement.querySelector<HTMLElement>('[data-vc="controls"]');
    const gridEl = self.HTMLElement.querySelector<HTMLElement>('[data-vc="grid"]');
    const columnEl = target.closest<HTMLElement>('[data-vc="column"]');

    if (controlsEl) self.HTMLElement.removeChild(controlsEl);
    if (gridEl) gridEl.dataset.vcGrid = 'hidden';
    if (columnEl) columnEl.dataset.vcColumn = self.private.currentType;
    if (columnEl) columnEl.innerHTML = parseLayout(self, self.layouts[self.private.currentType]);
    return;
  }

  self.HTMLElement.innerHTML = parseLayout(self, self.layouts[self.private.currentType]);
};

export default createLayouts;
