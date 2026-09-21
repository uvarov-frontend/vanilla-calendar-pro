import { setVisibilityArrows } from '@scripts/creators/visibilityArrows';
import type { Route } from '@scripts/handles/handleNavigate';
import getDate from '@scripts/utils/getDate';
import type { Calendar } from '@src/index';
import setWeekDate from './setDate';
export const shiftWeek = (self: Calendar, route: Route) => {
  const weekStart = getDate(self.context.displayWeekDate);
  weekStart.setDate(weekStart.getDate() + (route === 'next' ? 7 : -7));
  setWeekDate(self, weekStart);
};

export const handleWeekType = (self: Calendar, arrowPrevEl: HTMLElement, arrowNextEl: HTMLElement) => {
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
