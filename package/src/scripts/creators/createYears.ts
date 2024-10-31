import createLayouts from '@scripts/creators/createLayouts';
import visibilityArrows from '@scripts/creators/visibilityArrows';
import visibilityTitle from '@scripts/creators/visibilityTitle';
import type VanillaCalendar from '@src/vanilla-calendar';

const createYearEl = (self: VanillaCalendar, templateEl: HTMLButtonElement, selected: number, disabled: boolean, i: number) => {
  const yearEl = templateEl.cloneNode(false) as HTMLButtonElement;
  yearEl.className = self.styles.yearsYear;
  yearEl.innerText = String(i);
  yearEl.ariaLabel = String(i);
  yearEl.role = 'gridcell';
  yearEl.dataset.vcYearsYear = `${i}`;
  if (selected === i) yearEl.dataset.vcYearsYearSelected = '';
  if (selected === i) yearEl.ariaSelected = 'true';
  if (disabled) yearEl.ariaDisabled = 'true';
  if (disabled) yearEl.tabIndex = -1;
  yearEl.disabled = disabled;
  return yearEl;
};

const createYears = (self: VanillaCalendar, target?: HTMLElement) => {
  const selectedYear = target?.dataset.vcYear ? Number(target.dataset.vcYear) : self.selectedYear;

  self.private.currentType = 'year';
  createLayouts(self, target);
  visibilityTitle(self);
  visibilityArrows(self);

  const yearsEl = self.private.mainElement.querySelector('[data-vc="years"]');
  if (!self.settings.selection.year || !yearsEl) return;

  const relationshipID = self.type !== 'multiple' ? 0 : self.selectedYear === selectedYear ? 0 : 1;

  const templateYearEl = document.createElement('button');
  templateYearEl.type = 'button';

  for (let i = (self.viewYear as number) - 7; i < (self.viewYear as number) + 8; i++) {
    const yearDisabled = i < (self.private.dateMin as Date).getFullYear() + relationshipID || i > (self.private.dateMax as Date).getFullYear();
    const yearEl = createYearEl(self, templateYearEl, selectedYear, yearDisabled, i);
    yearsEl.appendChild(yearEl);
    if (self.actions.getYears) self.actions.getYears(i, yearEl, self);
  }

  self.private.mainElement.querySelector<HTMLElement>(`[data-vc-years-year]`)?.focus();
};

export default createYears;
