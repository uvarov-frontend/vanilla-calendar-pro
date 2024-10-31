import createDates from '@scripts/creators/createDates/createDates';
import visibilityArrows from '@scripts/creators/visibilityArrows';
import visibilityTitle from '@scripts/creators/visibilityTitle';
import getDate from '@scripts/utils/getDate';
import getDateString from '@scripts/utils/getDateString';
import type VanillaCalendar from '@src/vanilla-calendar';

const handleMonth = (self: VanillaCalendar, route: 'prev' | 'next') => {
  const jumpDate = getDate(getDateString(new Date(self.private.selectedYear, self.private.selectedMonth, 1)));

  const routeMap: Record<string, () => void> = {
    prev: () => jumpDate.setMonth(jumpDate.getMonth() - self.monthsToSwitch),
    next: () => jumpDate.setMonth(jumpDate.getMonth() + self.monthsToSwitch),
  };

  routeMap[route]();
  [self.private.selectedMonth, self.private.selectedYear] = [jumpDate.getMonth(), jumpDate.getFullYear()];

  visibilityTitle(self);
  visibilityArrows(self);
  createDates(self);
};

export default handleMonth;
