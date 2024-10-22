import getDate from '@scripts/helpers/getDate';
import getDateString from '@scripts/helpers/getDateString';
import createDates from '@scripts/modules/createDates/createDates';
import visibilityArrows from '@scripts/modules/visibilityArrows';
import visibilityTitle from '@scripts/modules/visibilityTitle';
import type VanillaCalendar from '@src/vanilla-calendar';

const changeMonth = (self: VanillaCalendar, route: 'prev' | 'next') => {
  const jumpDate = getDate(getDateString(new Date(self.selectedYear, self.selectedMonth, 1)));

  const routeMap: Record<string, () => void> = {
    prev: () => jumpDate.setMonth(jumpDate.getMonth() - self.jumpMonths),
    next: () => jumpDate.setMonth(jumpDate.getMonth() + self.jumpMonths),
  };

  routeMap[route]();
  [self.selectedMonth, self.selectedYear] = [jumpDate.getMonth(), jumpDate.getFullYear()];

  visibilityTitle(self);
  visibilityArrows(self);
  createDates(self);
};

export default changeMonth;
