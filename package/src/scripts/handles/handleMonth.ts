import createDates from '@scripts/creators/createDates/createDates';
import visibilityArrows from '@scripts/creators/visibilityArrows';
import visibilityTitle from '@scripts/creators/visibilityTitle';
import getDate from '@scripts/helpers/getDate';
import getDateString from '@scripts/helpers/getDateString';
import type VanillaCalendar from '@src/vanilla-calendar';

const handleMonth = (self: VanillaCalendar, route: 'prev' | 'next') => {
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

export default handleMonth;
