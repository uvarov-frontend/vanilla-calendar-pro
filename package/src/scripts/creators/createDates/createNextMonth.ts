import type { FormatDateString } from '@package/types';
import createDate from '@scripts/creators/createDates/createDate';
import type VanillaCalendar from '@src/vanilla-calendar';

const createNextMonth = (self: VanillaCalendar, daysEl: HTMLElement, days: number, currentYear: number, currentMonth: number, firstDayWeek: number) => {
  const currentTotalDays = firstDayWeek + days;
  const rowsDays = Math.ceil(currentTotalDays / 7);
  const daysNextMonth = 7 * rowsDays - currentTotalDays;
  const year = currentMonth + 1 === 12 ? currentYear + 1 : currentYear;
  const month = currentMonth + 1 === 12 ? '01' : currentMonth + 2 < 10 ? `0${currentMonth + 2}` : currentMonth + 2;

  for (let i = 1; i <= daysNextMonth; i++) {
    const day = i < 10 ? `0${i}` : String(i);
    const dateStr = `${year}-${month}-${day}` as FormatDateString;
    createDate(self, currentYear, daysEl, i, dateStr, 'next');
  }
};

export default createNextMonth;
