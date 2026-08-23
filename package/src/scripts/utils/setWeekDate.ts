import getDateString from '@scripts/utils/getDateString';
import setContext from '@scripts/utils/setContext';
import type { Calendar, Range } from '@src/index';

// The fourth day determines which month owns a straddling week.
const setWeekDate = (self: Calendar, weekStart: Date) => {
  const reference = new Date(weekStart);
  reference.setDate(weekStart.getDate() + 3);

  setContext(self, 'displayWeekDate', getDateString(weekStart));
  setContext(self, 'selectedMonth', reference.getMonth() as Range<12>);
  setContext(self, 'selectedYear', reference.getFullYear());
};

export default setWeekDate;
