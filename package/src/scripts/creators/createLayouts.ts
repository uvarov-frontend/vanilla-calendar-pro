import layoutDefault from '@scripts/layouts/default';
import layoutMonths from '@scripts/layouts/month';
import layoutMultiple from '@scripts/layouts/multiple';
import layoutWeek from '@scripts/layouts/week';
import layoutYears from '@scripts/layouts/year';
import { parseLayout, parseMultipleLayout } from '@scripts/utils/parseComponent';
import type { Calendar } from '@src/index';

const syncMultiselectable = (self: Calendar) => {
  const isMultiselectable = ['multiple', 'multiple-ranged'].includes(String(self.selectionDatesMode));
  self.context.mainElement.querySelectorAll<HTMLElement>('[data-vc="content"][role="grid"]').forEach((gridEl) => {
    if (isMultiselectable) gridEl.setAttribute('aria-multiselectable', 'true');
    else gridEl.removeAttribute('aria-multiselectable');
  });
};

const createLayouts = (self: Calendar, target?: HTMLElement) => {
  const templateMap = {
    default: layoutDefault,
    month: layoutMonths,
    year: layoutYears,
    multiple: layoutMultiple,
    week: layoutWeek,
  };

  Object.keys(templateMap).forEach((key) => {
    const typedKey = key as keyof typeof templateMap;
    if (!self.layouts[typedKey].length) self.layouts[typedKey] = templateMap[typedKey](self);
  });

  self.context.mainElement.className = self.styles.calendar;
  self.context.mainElement.dataset.vc = 'calendar';
  self.context.mainElement.dataset.vcType = self.context.currentType;
  self.context.mainElement.toggleAttribute('data-vc-swipe', self.enableSwipe);
  // Native buttons and a grid need no `application` role, which would only cost screen reader
  // users their reading commands. In input mode the popup is a dialog the input opens.
  self.context.mainElement.role = self.inputMode ? 'dialog' : 'group';
  self.context.mainElement.tabIndex = -1;
  self.context.mainElement.ariaLabel = self.labels.application;

  if (self.context.currentType === 'multiple') {
    self.context.mainElement.innerHTML = self.sanitizerHTML(parseMultipleLayout(self, parseLayout(self, self.layouts[self.context.currentType])));
    syncMultiselectable(self);
    return;
  }

  if (self.type === 'multiple' && target) {
    const controlsEl = self.context.mainElement.querySelector<HTMLElement>('[data-vc="controls"]');
    const gridEl = self.context.mainElement.querySelector<HTMLElement>('[data-vc="grid"]');
    const columnEl = target.closest<HTMLElement>('[data-vc="column"]');

    if (controlsEl) controlsEl.remove();
    if (gridEl) gridEl.dataset.vcGrid = 'hidden';
    if (columnEl) columnEl.dataset.vcColumn = self.context.currentType;
    if (columnEl) columnEl.innerHTML = self.sanitizerHTML(parseLayout(self, self.layouts[self.context.currentType]));
    syncMultiselectable(self);
    return;
  }

  self.context.mainElement.innerHTML = self.sanitizerHTML(parseLayout(self, self.layouts[self.context.currentType]));
  syncMultiselectable(self);
};

export default createLayouts;
