import getDate from '@scripts/utils/getDate';
import type { FormatDateString, WeekDayID } from '@src/index';

const getWeekNumber = (date: FormatDateString, weekStartDay: WeekDayID) => {
  const currentDate = getDate(date);
  const currentDay = (currentDate.getDay() - weekStartDay + 7) % 7;
  currentDate.setDate(currentDate.getDate() + 4 - currentDay);

  const yearStart = new Date(currentDate.getFullYear(), 0, 1);
  const weekNumber = Math.ceil(((+currentDate - +yearStart) / 86400000 + 1) / 7);

  return {
    year: currentDate.getFullYear(),
    week: weekNumber,
  };
};

export default getWeekNumber;
