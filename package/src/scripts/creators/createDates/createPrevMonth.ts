import type { FormatDateString } from '@package/types';
import createDate from '@scripts/creators/createDates/createDate';
import getDate from '@scripts/helpers/getDate';
import type VanillaCalendar from '@src/vanilla-calendar';

const createPrevMonth = (self: VanillaCalendar, datesEl: HTMLElement, currentYear: number, currentMonth: number, firstDayWeek: number) => {
  let day = new Date(currentYear, currentMonth, 0).getDate() - (firstDayWeek - 1);
  const year = currentMonth === 0 ? currentYear - 1 : currentYear;
  const month = currentMonth === 0 ? 12 : currentMonth < 10 ? `0${currentMonth}` : currentMonth;

  for (let i = firstDayWeek; i > 0; i--, day++) {
    const date = `${year}-${month}-${day}` as FormatDateString;
    const dayWeekID = getDate(date).getDay();
    createDate(self, currentYear, datesEl, day, dayWeekID, date, 'prev');
  }
};

export default createPrevMonth;
