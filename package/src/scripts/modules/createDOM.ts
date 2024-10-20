import { DOMParser, MultipleParser } from '@scripts/helpers/parseComponent';
import type VanillaCalendar from '@src/vanilla-calendar';

const createDOM = (self: VanillaCalendar, target?: HTMLElement) => {
  self.HTMLElement.className = self.CSSClasses.calendar;
  self.HTMLElement.dataset.vc = 'calendar';
  self.HTMLElement.dataset.vcType = self.currentType;

  if (self.currentType === 'multiple' && self.correctMonths) {
    self.HTMLElement.innerHTML = MultipleParser(self, DOMParser(self, self.DOMTemplates[self.currentType]));
    return;
  }

  if (self.type === 'multiple' && target) {
    const controls = self.HTMLElement.querySelector<HTMLElement>('[data-vc="controls"]');
    const grid = self.HTMLElement.querySelector<HTMLElement>('[data-vc="grid"]');
    const columnElement = target.closest<HTMLElement>('[data-vc="column"]');

    if (controls) self.HTMLElement.removeChild(controls);
    if (grid) grid.dataset.vcGrid = 'hidden';
    if (columnElement) columnElement.dataset.vcColumn = self.currentType;
    if (columnElement) columnElement.innerHTML = DOMParser(self, self.DOMTemplates[self.currentType]);
    return;
  }

  self.HTMLElement.innerHTML = DOMParser(self, self.DOMTemplates[self.currentType]);
};

export default createDOM;
