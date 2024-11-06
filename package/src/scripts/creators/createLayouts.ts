import layoutDefault from '@scripts/layouts/default';
import layoutMonths from '@scripts/layouts/month';
import layoutMultiple from '@scripts/layouts/multiple';
import layoutYears from '@scripts/layouts/year';
import { parseLayout, parseMultipleLayout } from '@scripts/utils/parseComponent';
import type { Calendar } from '@src/index';

const createLayouts = (self: Calendar, target?: HTMLElement) => {
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

  self.context.mainElement.className = self.styles.calendar;
  self.context.mainElement.dataset.vc = 'calendar';
  self.context.mainElement.dataset.vcType = self.context.currentType;
  self.context.mainElement.role = 'application';
  self.context.mainElement.tabIndex = 0;
  self.context.mainElement.ariaLabel = self.labels.application;

  if (self.context.currentType === 'multiple') {
    self.context.mainElement.innerHTML = self.sanitizerHTML(parseMultipleLayout(self, parseLayout(self, self.layouts[self.context.currentType])));
    return;
  }

  if (self.type === 'multiple' && target) {
    const controlsEl = self.context.mainElement.querySelector<HTMLElement>('[data-vc="controls"]');
    const gridEl = self.context.mainElement.querySelector<HTMLElement>('[data-vc="grid"]');
    const columnEl = target.closest<HTMLElement>('[data-vc="column"]');

    if (controlsEl) self.context.mainElement.removeChild(controlsEl);
    if (gridEl) gridEl.dataset.vcGrid = 'hidden';
    if (columnEl) columnEl.dataset.vcColumn = self.context.currentType;
    if (columnEl) columnEl.innerHTML = self.sanitizerHTML(parseLayout(self, self.layouts[self.context.currentType]));
    return;
  }

  self.context.mainElement.innerHTML = self.sanitizerHTML(parseLayout(self, self.layouts[self.context.currentType]));
};

export default createLayouts;
