import visibilityArrows from '@scripts/creators/visibilityArrows';
import visibilityTitle from '@scripts/creators/visibilityTitle';
import setContext from '@scripts/utils/setContext';
import type { Calendar, Range } from '@src/index';

const setYearModifier = (self: Calendar, el: HTMLButtonElement, type: 'month' | 'year', selected: boolean, reset: boolean) => {
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
    self.context.mainElement.querySelectorAll<HTMLElement>(selectors[type])?.forEach((el) => {
      el.removeAttribute(attributes[type].selected);
      el.removeAttribute(attributes[type].aria);
    });

    setContext(self, attributes[type].selectedProperty, Number(el.dataset[attributes[type].value]) as Range<12>);
    visibilityTitle(self);
    if (type === 'year') visibilityArrows(self);
  }

  if (selected) {
    el.setAttribute(attributes[type].selected, '');
    el.setAttribute(attributes[type].aria, 'true');
  }
};

export default setYearModifier;
