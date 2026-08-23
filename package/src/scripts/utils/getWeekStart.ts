import type { WeekDayID } from '@src/index';

const getWeekStart = (date: Date, firstWeekday: WeekDayID) => {
  const weekStart = new Date(date);
  weekStart.setDate(date.getDate() - ((date.getDay() - firstWeekday + 7) % 7));
  return weekStart;
};

export default getWeekStart;
