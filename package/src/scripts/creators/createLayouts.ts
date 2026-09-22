import layoutDefault from '@scripts/layouts/default';
import layoutMonths from '@scripts/layouts/month';
import layoutYears from '@scripts/layouts/year';
import { parseLayout } from '@scripts/utils/parseComponent';
import { getExtensions } from '@src/extension';
import type { Calendar } from '@src/index';

const syncMultiselectable = (self: Calendar) => {
  const isMultiselectable = ['multiple', 'multiple-ranged'].includes(String(self.selectionDatesMode));
  self.context.mainElement.querySelectorAll<HTMLElement>('[data-vc="content"][role="grid"]').forEach((gridEl) => {
    if (isMultiselectable) gridEl.setAttribute('aria-multiselectable', 'true');
    else gridEl.removeAttribute('aria-multiselectable');
  });
};

const createLayouts = (self: Calendar, target?: HTMLElement) => {
  const extensions = getExtensions(self);
  const templateMap = {
    default: layoutDefault,
    month: layoutMonths,
    year: layoutYears,
    multiple: extensions.months?.layout,
    week: extensions.weeks?.layout,
  };

  Object.keys(templateMap).forEach((key) => {
    const typedKey = key as keyof typeof templateMap;
    if (!self.layouts[typedKey].length) self.layouts[typedKey] = templateMap[typedKey]?.(self) ?? '';
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

  if (!extensions.months?.render(self, target)) {
    extensions.time?.destroy(self);
    self.context.mainElement.innerHTML = self.sanitizerHTML(parseLayout(self, self.layouts[self.context.currentType]));
  }
  syncMultiselectable(self);
};

export default createLayouts;
