import createDates from '@scripts/creators/createDates/createDates';
import visibilityArrowsFast from '@scripts/creators/visibilityArrowsFast';
import visibilityTitle from '@scripts/creators/visibilityTitle';
import getDate from '@scripts/utils/getDate';
import getDateString from '@scripts/utils/getDateString';
import setContext from '@scripts/utils/setContext';
import type { Calendar, Range } from '@src/index';

const handleMonthFast = (self: Calendar, route: 'prev' | 'next') => {

  const jumpDate = getDate(getDateString(new Date(self.context.selectedYear, self.context.selectedMonth, 1)));

  const dateMin = getDate(self.context.dateMin);
  const dateMax = getDate(self.context.dateMax);

  const jumpDateMin = new Date(jumpDate.getTime());
  const jumpDateMax = new Date(jumpDate.getTime());

  jumpDateMin.setMonth(jumpDate.getMonth() - self.monthsToSwitchFast);
  jumpDateMax.setMonth(jumpDateMax.getMonth() + self.monthsToSwitchFast);

  const isUnderLimitPrev =
    jumpDateMin.getFullYear() < dateMin.getFullYear() ||
    (jumpDateMin.getFullYear() === dateMin.getFullYear() && jumpDateMin.getMonth() < dateMin.getMonth());

  const isUnderLimitNext =
    jumpDateMax.getFullYear() > dateMax.getFullYear() ||
    (jumpDateMax.getFullYear() === dateMax.getFullYear() && jumpDateMax.getMonth() > dateMax.getMonth());

  const routeMap: Record<string, () => void> = {
    prev: () => isUnderLimitPrev ? jumpDate.setFullYear(dateMin.getFullYear(), dateMin.getMonth()) : jumpDate.setMonth(jumpDate.getMonth() - self.monthsToSwitchFast),
    next: () => isUnderLimitNext? jumpDate.setFullYear(dateMax.getFullYear(), dateMax.getMonth()) : jumpDate.setMonth(jumpDate.getMonth() + self.monthsToSwitchFast),
  };

  routeMap[route]();

  setContext(self, 'selectedMonth', jumpDate.getMonth() as Range<12>);
  setContext(self, 'selectedYear', jumpDate.getFullYear());

  visibilityTitle(self);
  visibilityArrowsFast(self);
  createDates(self);
};

export default handleMonthFast;
