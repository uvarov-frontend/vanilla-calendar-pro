import type { FormatDateString, WeekDay } from '@package/types';
import createDate from '@scripts/creators/createDates/createDate';
import getDate from '@scripts/helpers/getDate';
import type VanillaCalendar from '@src/vanilla-calendar';

const createNextMonth = (self: VanillaCalendar, daysEl: HTMLElement, days: number, currentYear: number, currentMonth: number, firstDayWeek: number) => {
  const currentTotalDays = firstDayWeek + days;
  const rowsDays = Math.ceil(currentTotalDays / 7);
  const daysNextMonth = 7 * rowsDays - currentTotalDays;
  const year = currentMonth + 1 === 12 ? currentYear + 1 : currentYear;
  const month = currentMonth + 1 === 12 ? '01' : currentMonth + 2 < 10 ? `0${currentMonth + 2}` : currentMonth + 2;

  for (let i = 1; i <= daysNextMonth; i++) {
    const day = i < 10 ? `0${i}` : String(i);
    const date = `${year}-${month}-${day}` as FormatDateString;
    const dayWeekID = getDate(date).getDay() as WeekDay;
    createDate(self, currentYear, daysEl, i, dayWeekID, date, 'next');
  }
};

export default createNextMonth;
