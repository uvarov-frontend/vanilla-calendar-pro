import visibilityArrows from '@scripts/creators/visibilityArrows';
import visibilityTitle from '@scripts/creators/visibilityTitle';
import type { VanillaCalendarPro } from '@src/index';

const setYearModifier = (self: VanillaCalendarPro, el: HTMLButtonElement, type: 'month' | 'year', selected: boolean, reset: boolean) => {
  const selectors = {
    month: '[data-vc-months-month]',
    year: '[data-vc-years-year]',
  } as const;

  const attributes = {
    month: {
      selected: 'data-vc-months-month-selected',
      aria: 'aria-selected',
      value: 'vcMonthsMonth',
      selectedProperty: 'selectedMonth',
    },
    year: {
      selected: 'data-vc-years-year-selected',
      aria: 'aria-selected',
      value: 'vcYearsYear',
      selectedProperty: 'selectedYear',
    },
  } as const;

  if (reset) {
    self.private.mainElement.querySelectorAll<HTMLElement>(selectors[type])?.forEach((el) => {
      el.removeAttribute(attributes[type].selected);
      el.removeAttribute(attributes[type].aria);
    });

    self.private[attributes[type].selectedProperty] = Number(el.dataset[attributes[type].value]);
    visibilityTitle(self);
    if (type === 'year') visibilityArrows(self);
  }

  if (selected) {
    el.setAttribute(attributes[type].selected, '');
    el.setAttribute(attributes[type].aria, 'true');
  }
};

export default setYearModifier;