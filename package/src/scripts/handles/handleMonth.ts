import createDates from '@scripts/creators/createDates/createDates';
import visibilityArrows from '@scripts/creators/visibilityArrows';
import visibilityTitle from '@scripts/creators/visibilityTitle';
import getDate from '@scripts/utils/getDate';
import getDateString from '@scripts/utils/getDateString';
import setContext from '@scripts/utils/setContext';
import type { Calendar, Range } from '@src/index';

const handleMonth = (self: Calendar, route: 'prev' | 'next') => {
  const jumpDate = getDate(getDateString(new Date(self.context.selectedYear, self.context.selectedMonth, 1)));

  const routeMap: Record<string, () => void> = {
    prev: () => jumpDate.setMonth(jumpDate.getMonth() - self.monthsToSwitch),
    next: () => jumpDate.setMonth(jumpDate.getMonth() + self.monthsToSwitch),
  };

  routeMap[route]();

  setContext(self, 'selectedMonth', jumpDate.getMonth() as Range<12>);
  setContext(self, 'selectedYear', jumpDate.getFullYear());

  visibilityTitle(self);
  visibilityArrows(self);
  createDates(self);
};

export default handleMonth;
