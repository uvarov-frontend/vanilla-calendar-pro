import createLayouts from '@scripts/creators/createLayouts';
import createPickerCell from '@scripts/creators/createPickerCell';
import visibilityArrows from '@scripts/creators/visibilityArrows';
import visibilityTitle from '@scripts/creators/visibilityTitle';
import getDate from '@scripts/utils/getDate';
import updateRovingTabIndex from '@scripts/utils/rovingTabIndex';
import setContext from '@scripts/utils/setContext';
import type { Calendar } from '@src/index';

const createYears = (self: Calendar, target?: HTMLElement) => {
  const selectedYear = target?.dataset.vcYear ? Number(target.dataset.vcYear) : self.context.selectedYear;

  setContext(self, 'currentType', 'year');
  createLayouts(self, target);
  visibilityTitle(self);
  visibilityArrows(self);

  const yearsEl = self.context.mainElement.querySelector('[data-vc="years"]');
  if (!self.selectionYearsMode || !yearsEl) return;

  const relationshipID = self.type !== 'multiple' ? 0 : self.context.selectedYear === selectedYear ? 0 : 1;

  const templateYearEl = document.createElement('button');
  templateYearEl.type = 'button';

  let rowEl: HTMLDivElement | undefined;
  const getLimits = () => [getDate(self.context.dateMin).getFullYear(), getDate(self.context.dateMax).getFullYear()];
  const limits = !self.onCreateYearEls ? getLimits() : undefined;

  for (let i = self.context.displayYear - 7; i < self.context.displayYear + 8; i++) {
    if ((i - (self.context.displayYear - 7)) % 5 === 0) {
      rowEl = document.createElement('div');
      rowEl.className = self.styles.yearsRow;
      rowEl.dataset.vcYears = 'row';
      rowEl.role = 'row';
      yearsEl.appendChild(rowEl);
    }

    const [min, max] = limits ?? getLimits();
    const yearDisabled = i < min + relationshipID || i > max;
    const yearEl = createPickerCell(self, 'year', templateYearEl, selectedYear, yearDisabled, i, String(i), String(i));
    rowEl?.appendChild(yearEl);
    if (self.onCreateYearEls) self.onCreateYearEls(self, yearEl);
  }

  updateRovingTabIndex(self);
};

export default createYears;
