import createDates from '@scripts/creators/createDates/createDates';
import createYears from '@scripts/creators/createYears';
import visibilityArrows from '@scripts/creators/visibilityArrows';
import visibilityTitle from '@scripts/creators/visibilityTitle';
import animate from '@scripts/utils/animate';
import getDate from '@scripts/utils/getDate';
import getDateString from '@scripts/utils/getDateString';
import setContext from '@scripts/utils/setContext';
import setWeekDate from '@scripts/utils/setWeekDate';
import type { Calendar, Range } from '@src/index';

export type Route = 'prev' | 'next';

type Navigator = {
  selector: string;
  shift: (route: Route) => void;
  render: (target?: HTMLElement) => void;
};

const DATES = '[data-vc="dates"]';

const step = (route: Route, amount: number) => (route === 'next' ? amount : -amount);

const shiftMonth = (self: Calendar, route: Route) => {
  const jumpDate = getDate(getDateString(new Date(self.context.selectedYear, self.context.selectedMonth, 1)));
  jumpDate.setMonth(jumpDate.getMonth() + step(route, self.monthsToSwitch));
  setContext(self, 'selectedMonth', jumpDate.getMonth() as Range<12>);
  setContext(self, 'selectedYear', jumpDate.getFullYear());
};

const shiftWeek = (self: Calendar, route: Route) => {
  const weekStart = getDate(self.context.displayWeekDate);
  weekStart.setDate(weekStart.getDate() + step(route, 7));
  setWeekDate(self, weekStart);
};

export const getNavigator = (self: Calendar): Navigator | null => {
  const byMonth = { selector: DATES, shift: (route: Route) => shiftMonth(self, route), render: () => createDates(self) };

  return (
    {
      default: byMonth,
      multiple: byMonth,
      week: { selector: DATES, shift: (route: Route) => shiftWeek(self, route), render: () => createDates(self) },
      year: {
        selector: '[data-vc="years"]',
        shift: (route: Route) => setContext(self, 'displayYear', self.context.displayYear + step(route, 15)),
        render: (target?: HTMLElement) => createYears(self, target),
      },
      month: null,
    } satisfies Record<Calendar['type'], Navigator | null>
  )[self.context.currentType];
};

const handleNavigate = (self: Calendar, route: Route, target?: HTMLElement) => {
  const navigator = getNavigator(self);
  if (!navigator) return;

  navigator.shift(route);
  visibilityTitle(self);
  visibilityArrows(self);
  animate(self, navigator.selector, route, () => navigator.render(target));
};

export default handleNavigate;
