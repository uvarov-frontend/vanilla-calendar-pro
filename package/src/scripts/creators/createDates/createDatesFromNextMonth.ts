import createDate from '@scripts/creators/createDates/createDate';
import type { Calendar, FormatDateString } from '@src/index';

const createDatesFromNextMonth = (
  self: Calendar,
  datesContainer: { addDate: (dateEl: HTMLElement) => void },
  daysNextMonth: number,
  currentYear: number,
  currentMonth: number,
) => {
  const year = currentMonth + 1 === 12 ? currentYear + 1 : currentYear;
  const month = currentMonth + 1 === 12 ? '01' : currentMonth + 2 < 10 ? `0${currentMonth + 2}` : currentMonth + 2;

  for (let i = 1; i <= daysNextMonth; i++) {
    const day = i < 10 ? `0${i}` : String(i);
    const dateStr = `${year}-${month}-${day}` as FormatDateString;
    createDate(self, currentYear, datesContainer, i, dateStr, 'next');
  }
};

export default createDatesFromNextMonth;
