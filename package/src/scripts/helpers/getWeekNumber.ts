import type { FormatDateString } from '@package/types';
import getDate from '@scripts/helpers/getDate';

const getWeekNumber = (date: FormatDateString, iso8601: boolean) => {
  const currentDate = getDate(date);
  currentDate.setDate(currentDate.getDate() + 4 - (iso8601 ? currentDate.getDay() || 7 : currentDate.getDay()));

  const yearStart = new Date(currentDate.getFullYear(), 0, 1);
  const weekNumber = Math.ceil(((+currentDate - +yearStart) / 86400000 + 1) / 7);

  return {
    year: currentDate.getFullYear(),
    week: weekNumber,
  };
};

export default getWeekNumber;
