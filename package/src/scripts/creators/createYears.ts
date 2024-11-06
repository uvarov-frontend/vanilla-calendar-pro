import createLayouts from '@scripts/creators/createLayouts';
import setMonthOrYearModifier from '@scripts/creators/setMonthOrYearModifier';
import visibilityArrows from '@scripts/creators/visibilityArrows';
import visibilityTitle from '@scripts/creators/visibilityTitle';
import getDate from '@scripts/utils/getDate';
import type { VanillaCalendarPro } from '@src/index';

const createYearEl = (self: VanillaCalendarPro, templateEl: HTMLButtonElement, selected: number, disabled: boolean, id: number) => {
  const yearEl = templateEl.cloneNode(false) as HTMLButtonElement;
  yearEl.className = self.styles.yearsYear;
  yearEl.innerText = String(id);
  yearEl.ariaLabel = String(id);
  yearEl.role = 'gridcell';
  yearEl.dataset.vcYearsYear = `${id}`;
  if (disabled) yearEl.ariaDisabled = 'true';
  if (disabled) yearEl.tabIndex = -1;
  yearEl.disabled = disabled;
  setMonthOrYearModifier(self, yearEl, 'year', selected === id, false);
  return yearEl;
};

const createYears = (self: VanillaCalendarPro, target?: HTMLElement) => {
  const selectedYear = target?.dataset.vcYear ? Number(target.dataset.vcYear) : self.context.selectedYear;

  self.context.currentType = 'year';
  createLayouts(self, target);
  visibilityTitle(self);
  visibilityArrows(self);

  const yearsEl = self.context.mainElement.querySelector('[data-vc="years"]');
  if (!self.selectionYearsMode || !yearsEl) return;

  const relationshipID = self.type !== 'multiple' ? 0 : self.context.selectedYear === selectedYear ? 0 : 1;

  const templateYearEl = document.createElement('button');
  templateYearEl.type = 'button';

  for (let i = (self.context.displayYear as number) - 7; i < (self.context.displayYear as number) + 8; i++) {
    const yearDisabled = i < getDate(self.context.dateMin).getFullYear() + relationshipID || i > getDate(self.context.dateMax).getFullYear();
    const yearEl = createYearEl(self, templateYearEl, selectedYear, yearDisabled, i);
    yearsEl.appendChild(yearEl);
    if (self.onCreateYearEls) self.onCreateYearEls(self, yearEl);
  }

  self.context.mainElement.querySelector<HTMLElement>(`[data-vc-years-year]`)?.focus();
};

export default createYears;
