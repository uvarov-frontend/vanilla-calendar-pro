import createDate from '@scripts/creators/createDates/createDate';
import type { Calendar, FormatDateString } from '@src/index';

const createDatesFromPrevMonth = (self: Calendar, datesEl: HTMLElement, currentYear: number, currentMonth: number, firstDayWeek: number) => {
  let date = new Date(currentYear, currentMonth, 0).getDate() - (firstDayWeek - 1);
  const year = currentMonth === 0 ? currentYear - 1 : currentYear;
  const month = currentMonth === 0 ? 12 : currentMonth < 10 ? `0${currentMonth}` : currentMonth;

  for (let i = firstDayWeek; i > 0; i--, date++) {
    const dateStr = `${year}-${month}-${date}` as FormatDateString;
    createDate(self, currentYear, datesEl, date, dateStr, 'prev');
  }
};

export default createDatesFromPrevMonth;
