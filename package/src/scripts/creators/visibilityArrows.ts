import getDate from '@scripts/utils/getDate';
import getDateString from '@scripts/utils/getDateString';
import type VanillaCalendar from '@src/vanilla-calendar';

const setVisibilityArrows = (arrowPrevEl: HTMLElement, arrowNextEl: HTMLElement, isArrowPrevHidden: boolean, isArrowNextHidden: boolean) => {
  arrowPrevEl.style.visibility = isArrowPrevHidden ? 'hidden' : '';
  arrowNextEl.style.visibility = isArrowNextHidden ? 'hidden' : '';
};

const handleDefaultType = (self: VanillaCalendar, arrowPrevEl: HTMLElement, arrowNextEl: HTMLElement) => {
  const currentSelectedDate = getDate(getDateString(new Date(self.selectedYear as number, self.selectedMonth as number, 1)));
  const jumpDateMin = new Date(currentSelectedDate.getTime());
  const jumpDateMax = new Date(currentSelectedDate.getTime());
  jumpDateMin.setMonth(jumpDateMin.getMonth() - self.jumpMonths);
  jumpDateMax.setMonth(jumpDateMax.getMonth() + self.jumpMonths);

  if (!self.settings.selection.year) {
    self.dateMin.setFullYear(currentSelectedDate.getFullYear());
    self.dateMax.setFullYear(currentSelectedDate.getFullYear());
  }

  const isArrowPrevHidden =
    !self.settings.selection.month ||
    jumpDateMin.getFullYear() < self.dateMin.getFullYear() ||
    (jumpDateMin.getFullYear() === self.dateMin.getFullYear() && jumpDateMin.getMonth() < self.dateMin.getMonth());
  const isArrowNextHidden =
    !self.settings.selection.month ||
    jumpDateMax.getFullYear() > self.dateMax.getFullYear() ||
    (jumpDateMax.getFullYear() === self.dateMax.getFullYear() && jumpDateMax.getMonth() > self.dateMax.getMonth());

  setVisibilityArrows(arrowPrevEl, arrowNextEl, isArrowPrevHidden, isArrowNextHidden);
};

const handleYearType = (self: VanillaCalendar, arrowPrevEl: HTMLElement, arrowNextEl: HTMLElement) => {
  const isArrowPrevHidden = !!(self.dateMin.getFullYear() && self.viewYear - 7 <= self.dateMin.getFullYear());
  const isArrowNextHidden = !!(self.dateMax.getFullYear() && self.viewYear + 7 >= self.dateMax.getFullYear());

  setVisibilityArrows(arrowPrevEl, arrowNextEl, isArrowPrevHidden, isArrowNextHidden);
};

const visibilityArrows = (self: VanillaCalendar) => {
  if (self.private.currentType === 'month') return;

  const arrowPrevEl = self.HTMLElement.querySelector<HTMLElement>('[data-vc-arrow="prev"]');
  const arrowNextEl = self.HTMLElement.querySelector<HTMLElement>('[data-vc-arrow="next"]');
  if (!arrowPrevEl || !arrowNextEl) return;

  const updateType = {
    default: () => handleDefaultType(self, arrowPrevEl, arrowNextEl),
    year: () => handleYearType(self, arrowPrevEl, arrowNextEl),
  };

  updateType[self.private.currentType === 'multiple' ? 'default' : self.private.currentType]();
};

export default visibilityArrows;
