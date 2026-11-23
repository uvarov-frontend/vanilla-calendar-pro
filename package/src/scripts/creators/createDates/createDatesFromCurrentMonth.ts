import createDate from '@scripts/creators/createDates/createDate';
import type { Calendar, FormatDateString } from '@src/index';

const createDatesFromCurrentMonth = (
  self: Calendar,
  datesContainer: { addDate: (dateEl: HTMLElement) => void },
  days: number,
  currentYear: number,
  currentMonth: number,
) => {
  // Built as a string: a local Date on a day the zone skipped would roll over and repeat the next day.
  const month = currentMonth + 1 < 10 ? `0${currentMonth + 1}` : currentMonth + 1;
  for (let dateID = 1; dateID <= days; dateID++) {
    const dateStr = `${currentYear}-${month}-${dateID < 10 ? `0${dateID}` : dateID}` as FormatDateString;
    createDate(self, currentYear, datesContainer, dateID, dateStr, 'current');
  }
};

export default createDatesFromCurrentMonth;
