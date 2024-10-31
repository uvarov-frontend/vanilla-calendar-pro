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
    self.private.dateMin.setFullYear(currentSelectedDate.getFullYear());
    self.private.dateMax.setFullYear(currentSelectedDate.getFullYear());
  }

  const isArrowPrevHidden =
    !self.settings.selection.month ||
    jumpDateMin.getFullYear() < self.private.dateMin.getFullYear() ||
    (jumpDateMin.getFullYear() === self.private.dateMin.getFullYear() && jumpDateMin.getMonth() < self.private.dateMin.getMonth());
  const isArrowNextHidden =
    !self.settings.selection.month ||
    jumpDateMax.getFullYear() > self.private.dateMax.getFullYear() ||
    (jumpDateMax.getFullYear() === self.private.dateMax.getFullYear() && jumpDateMax.getMonth() > self.private.dateMax.getMonth());

  setVisibilityArrows(arrowPrevEl, arrowNextEl, isArrowPrevHidden, isArrowNextHidden);
};

const handleYearType = (self: VanillaCalendar, arrowPrevEl: HTMLElement, arrowNextEl: HTMLElement) => {
  const isArrowPrevHidden = !!(self.private.dateMin.getFullYear() && self.private.displayYear - 7 <= self.private.dateMin.getFullYear());
  const isArrowNextHidden = !!(self.private.dateMax.getFullYear() && self.private.displayYear + 7 >= self.private.dateMax.getFullYear());

  setVisibilityArrows(arrowPrevEl, arrowNextEl, isArrowPrevHidden, isArrowNextHidden);
};

const visibilityArrows = (self: VanillaCalendar) => {
  if (self.private.currentType === 'month') return;

  const arrowPrevEl = self.private.mainElement.querySelector<HTMLElement>('[data-vc-arrow="prev"]');
  const arrowNextEl = self.private.mainElement.querySelector<HTMLElement>('[data-vc-arrow="next"]');
  if (!arrowPrevEl || !arrowNextEl) return;

  const updateType = {
    default: () => handleDefaultType(self, arrowPrevEl, arrowNextEl),
    year: () => handleYearType(self, arrowPrevEl, arrowNextEl),
  };

  updateType[self.private.currentType === 'multiple' ? 'default' : self.private.currentType]();
};

export default visibilityArrows;
