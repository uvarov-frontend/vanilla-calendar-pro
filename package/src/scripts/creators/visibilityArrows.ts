import getDate from '@scripts/utils/getDate';
import getDateString from '@scripts/utils/getDateString';
import type { VanillaCalendarPro } from '@src/index';

const setVisibilityArrows = (arrowPrevEl: HTMLElement, arrowNextEl: HTMLElement, isArrowPrevHidden: boolean, isArrowNextHidden: boolean) => {
  arrowPrevEl.style.visibility = isArrowPrevHidden ? 'hidden' : '';
  arrowNextEl.style.visibility = isArrowNextHidden ? 'hidden' : '';
};

const handleDefaultType = (self: VanillaCalendarPro, arrowPrevEl: HTMLElement, arrowNextEl: HTMLElement) => {
  const currentSelectedDate = getDate(getDateString(new Date(self.private.selectedYear as number, self.private.selectedMonth as number, 1)));
  const jumpDateMin = new Date(currentSelectedDate.getTime());
  const jumpDateMax = new Date(currentSelectedDate.getTime());
  jumpDateMin.setMonth(jumpDateMin.getMonth() - self.monthsToSwitch);
  jumpDateMax.setMonth(jumpDateMax.getMonth() + self.monthsToSwitch);

  const dateMin = getDate(self.private.dateMin);
  const dateMax = getDate(self.private.dateMax);

  if (!self.selectionYearsMode) {
    dateMin.setFullYear(currentSelectedDate.getFullYear());
    dateMax.setFullYear(currentSelectedDate.getFullYear());
  }

  const isArrowPrevHidden =
    !self.selectionMonthsMode ||
    jumpDateMin.getFullYear() < dateMin.getFullYear() ||
    (jumpDateMin.getFullYear() === dateMin.getFullYear() && jumpDateMin.getMonth() < dateMin.getMonth());
  const isArrowNextHidden =
    !self.selectionMonthsMode ||
    jumpDateMax.getFullYear() > dateMax.getFullYear() ||
    (jumpDateMax.getFullYear() === dateMax.getFullYear() && jumpDateMax.getMonth() > dateMax.getMonth());

  setVisibilityArrows(arrowPrevEl, arrowNextEl, isArrowPrevHidden, isArrowNextHidden);
};

const handleYearType = (self: VanillaCalendarPro, arrowPrevEl: HTMLElement, arrowNextEl: HTMLElement) => {
  const dateMin = getDate(self.private.dateMin);
  const dateMax = getDate(self.private.dateMax);
  const isArrowPrevHidden = !!(dateMin.getFullYear() && self.private.displayYear - 7 <= dateMin.getFullYear());
  const isArrowNextHidden = !!(dateMax.getFullYear() && self.private.displayYear + 7 >= dateMax.getFullYear());

  setVisibilityArrows(arrowPrevEl, arrowNextEl, isArrowPrevHidden, isArrowNextHidden);
};

const visibilityArrows = (self: VanillaCalendarPro) => {
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
