import getDate from '@scripts/utils/getDate';
import getDateString from '@scripts/utils/getDateString';
import type { Calendar } from '@src/index';

const setVisibilityArrows = (arrowPrevEl: HTMLElement, arrowNextEl: HTMLElement, isArrowPrevHidden: boolean, isArrowNextHidden: boolean) => {
  arrowPrevEl.style.visibility = isArrowPrevHidden ? 'hidden' : '';
  arrowNextEl.style.visibility = isArrowNextHidden ? 'hidden' : '';
};

const handleDefaultType = (self: Calendar, arrowPrevEl: HTMLElement, arrowNextEl: HTMLElement) => {
  const currentSelectedDate = getDate(getDateString(new Date(self.context.selectedYear as number, self.context.selectedMonth as number, 1)));
  const jumpDateMin = new Date(currentSelectedDate.getTime());
  const jumpDateMax = new Date(currentSelectedDate.getTime());
  jumpDateMin.setMonth(jumpDateMin.getMonth() - self.monthsToSwitch);
  jumpDateMax.setMonth(jumpDateMax.getMonth() + self.monthsToSwitch);

  const dateMin = getDate(self.context.dateMin);
  const dateMax = getDate(self.context.dateMax);

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
    (jumpDateMax.getFullYear() === dateMax.getFullYear() && jumpDateMax.getMonth() > dateMax.getMonth() - (self.context.displayMonthsCount - 1));

  setVisibilityArrows(arrowPrevEl, arrowNextEl, isArrowPrevHidden, isArrowNextHidden);
};

const handleYearType = (self: Calendar, arrowPrevEl: HTMLElement, arrowNextEl: HTMLElement) => {
  const dateMin = getDate(self.context.dateMin);
  const dateMax = getDate(self.context.dateMax);
  const isArrowPrevHidden = !!(dateMin.getFullYear() && self.context.displayYear - 7 <= dateMin.getFullYear());
  const isArrowNextHidden = !!(dateMax.getFullYear() && self.context.displayYear + 7 >= dateMax.getFullYear());

  setVisibilityArrows(arrowPrevEl, arrowNextEl, isArrowPrevHidden, isArrowNextHidden);
};

const handleWeekType = (self: Calendar, arrowPrevEl: HTMLElement, arrowNextEl: HTMLElement) => {
  const weekStart = getDate(self.context.displayWeekDate);
  const prevWeekStart = new Date(weekStart);
  prevWeekStart.setDate(weekStart.getDate() - 7);
  const prevWeekEnd = new Date(weekStart);
  prevWeekEnd.setDate(weekStart.getDate() - 1);
  const nextWeekStart = new Date(weekStart);
  nextWeekStart.setDate(weekStart.getDate() + 7);
  const ownerYear = (start: Date) => {
    const reference = new Date(start);
    reference.setDate(start.getDate() + 3);
    return reference.getFullYear();
  };
  const prevChangesYear = !self.selectionYearsMode && ownerYear(prevWeekStart) !== self.context.selectedYear;
  const nextChangesYear = !self.selectionYearsMode && ownerYear(nextWeekStart) !== self.context.selectedYear;

  const isArrowPrevHidden = !self.selectionMonthsMode || prevChangesYear || prevWeekEnd < getDate(self.context.dateMin);
  const isArrowNextHidden = !self.selectionMonthsMode || nextChangesYear || nextWeekStart > getDate(self.context.dateMax);

  setVisibilityArrows(arrowPrevEl, arrowNextEl, isArrowPrevHidden, isArrowNextHidden);
};

const visibilityArrows = (self: Calendar) => {
  if (self.context.currentType === 'month') return;

  const arrowPrevEl = self.context.mainElement.querySelector<HTMLElement>('[data-vc-arrow="prev"]');
  const arrowNextEl = self.context.mainElement.querySelector<HTMLElement>('[data-vc-arrow="next"]');
  if (!arrowPrevEl || !arrowNextEl) return;

  const updateType = {
    default: () => handleDefaultType(self, arrowPrevEl, arrowNextEl),
    year: () => handleYearType(self, arrowPrevEl, arrowNextEl),
    week: () => handleWeekType(self, arrowPrevEl, arrowNextEl),
  };

  updateType[self.context.currentType === 'multiple' ? 'default' : self.context.currentType]();
};

export default visibilityArrows;
