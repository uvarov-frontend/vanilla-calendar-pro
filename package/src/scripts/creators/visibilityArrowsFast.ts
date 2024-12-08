import getDate from '@scripts/utils/getDate';
import getDateString from '@scripts/utils/getDateString';
import type { Calendar } from '@src/index';

const setVisibilityArrows = (
  arrowPrevEl: HTMLElement,
  arrowNextEl: HTMLElement,
  isArrowPrevHidden: boolean,
  isArrowNextHidden: boolean,
  isArrowPrevDisplayed: boolean,
  isArrowNextDisplayed: boolean,
) => {
  arrowPrevEl.style.display = isArrowPrevDisplayed ? 'none' : 'block';
  arrowNextEl.style.display = isArrowNextDisplayed ? 'none' : 'block';
  arrowPrevEl.style.visibility = isArrowPrevHidden ? 'hidden' : '';
  arrowNextEl.style.visibility = isArrowNextHidden ? 'hidden' : '';
  // arrowPrevEl.style.visibility = '';
  // arrowNextEl.style.visibility = '';
};

const handleDefaultType = (self: Calendar, arrowPrevEl: HTMLElement, arrowNextEl: HTMLElement) => {
  const currentSelectedDate = getDate(getDateString(new Date(self.context.selectedYear as number, self.context.selectedMonth as number, 1)));

  const dateMin = getDate(self.context.dateMin);
  const dateMax = getDate(self.context.dateMax);

  if (!self.selectionYearsMode) {
    dateMin.setFullYear(currentSelectedDate.getFullYear());
    dateMax.setFullYear(currentSelectedDate.getFullYear());
  }

  const isArrowPrevHidden =
    !self.selectionMonthsMode || (currentSelectedDate.getFullYear() === dateMin.getFullYear() && currentSelectedDate.getMonth() === dateMin.getMonth());

  const isArrowNextHidden =
    !self.selectionMonthsMode || (currentSelectedDate.getFullYear() === dateMax.getFullYear() && currentSelectedDate.getMonth() === dateMax.getMonth());

  const isArrowPrevDisplayed = !self.monthsToSwitchFast;
  const isArrowNextDisplayed = !self.monthsToSwitchFast;

  setVisibilityArrows(arrowPrevEl, arrowNextEl, isArrowPrevHidden, isArrowNextHidden, isArrowPrevDisplayed, isArrowNextDisplayed);
};

const visibilityArrowsFast = (self: Calendar) => {
  if (self.context.currentType !== 'multiple') return;

  const arrowPrevEl = self.context.mainElement.querySelector<HTMLElement>('[data-vc-arrow-fast="prev"]');
  const arrowNextEl = self.context.mainElement.querySelector<HTMLElement>('[data-vc-arrow-fast="next"]');
  if (!arrowPrevEl || !arrowNextEl) return;

  const updateType = {
    multiple: () => handleDefaultType(self, arrowPrevEl, arrowNextEl),
  };

  /// updateType[self.context.currentType === 'multiple' ? 'default' : self.context.currentType]();
  updateType['multiple']();
};

export default visibilityArrowsFast;
