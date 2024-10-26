import { parseDOM, parseMultiple } from '@scripts/helpers/parseComponent';
import DOMDefault from '@scripts/templates/DOMDefault';
import DOMMonth from '@scripts/templates/DOMMonth';
import DOMMultiple from '@scripts/templates/DOMMultiple';
import DOMYear from '@scripts/templates/DOMYear';
import type VanillaCalendar from '@src/vanilla-calendar';

const createDOM = (self: VanillaCalendar, target?: HTMLElement) => {
  const templateMap = {
    default: DOMDefault,
    month: DOMMonth,
    year: DOMYear,
    multiple: DOMMultiple,
  };

  Object.keys(templateMap).forEach((key) => {
    const typedKey = key as keyof typeof templateMap;
    if (!self.DOMTemplates[typedKey].length) {
      self.DOMTemplates[typedKey] = templateMap[typedKey](self);
    }
  });

  self.HTMLElement.className = self.CSSClasses.calendar;
  self.HTMLElement.dataset.vc = 'calendar';
  self.HTMLElement.dataset.vcType = self.currentType;
  self.HTMLElement.role = 'application';
  self.HTMLElement.ariaLabel = self.locale.ariaLabels.application;

  if (self.currentType === 'multiple' && self.correctMonths) {
    self.HTMLElement.innerHTML = parseMultiple(self, parseDOM(self, self.DOMTemplates[self.currentType]));
    return;
  }

  if (self.type === 'multiple' && target) {
    const controlsEl = self.HTMLElement.querySelector<HTMLElement>('[data-vc="controls"]');
    const gridEl = self.HTMLElement.querySelector<HTMLElement>('[data-vc="grid"]');
    const columnEl = target.closest<HTMLElement>('[data-vc="column"]');

    if (controlsEl) self.HTMLElement.removeChild(controlsEl);
    if (gridEl) gridEl.dataset.vcGrid = 'hidden';
    if (columnEl) columnEl.dataset.vcColumn = self.currentType;
    if (columnEl) columnEl.innerHTML = parseDOM(self, self.DOMTemplates[self.currentType]);
    return;
  }

  self.HTMLElement.innerHTML = parseDOM(self, self.DOMTemplates[self.currentType]);
};

export default createDOM;
