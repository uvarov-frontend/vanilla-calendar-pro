import createDate, { type DateContainer } from '@scripts/creators/createDates/createDate';
import getDateString from '@scripts/utils/getDateString';
import type { Calendar } from '@src/index';

const createDatesFromCurrentMonth = (self: Calendar, datesContainer: DateContainer, days: number, currentYear: number, currentMonth: number) => {
  for (let dateID = 1; dateID <= days; dateID++) {
    const date = new Date(currentYear, currentMonth, dateID);
    createDate(self, currentYear, datesContainer, dateID, getDateString(date), 'current');
  }
};

export default createDatesFromCurrentMonth;
