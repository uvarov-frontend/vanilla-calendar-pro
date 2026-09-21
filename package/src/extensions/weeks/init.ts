import getDate from '@scripts/utils/getDate';
import getDateString from '@scripts/utils/getDateString';
import getWeekStart from '@scripts/utils/getWeekStart';
import setContext from '@scripts/utils/setContext';
import type { Calendar, FormatDateString } from '@src/index';

// Preserve the displayed week across update() while it still overlaps the selected month.
const initWeek = (self: Calendar, reanchor = false) => {
  const { displayWeekDate, selectedMonth, selectedYear, selectedDates, dateToday } = self.context;

  const isSelectedMonth = (date: Date) => date.getMonth() === selectedMonth && date.getFullYear() === selectedYear;

  if (displayWeekDate && !reanchor) {
    const weekStart = getDate(displayWeekDate);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    if (isSelectedMonth(weekStart) || isSelectedMonth(weekEnd)) {
      if (weekStart.getDay() === self.firstWeekday) return;

      // The fourth day determines which month owns a straddling week.
      const reference = new Date(weekStart);
      reference.setDate(weekStart.getDate() + 3);
      setContext(self, 'displayWeekDate', getDateString(getWeekStart(reference, self.firstWeekday)));
      return;
    }
  }

  const anchor = ([selectedDates?.[0], dateToday].filter(Boolean) as FormatDateString[]).map(getDate).find(isSelectedMonth);
  setContext(self, 'displayWeekDate', getDateString(getWeekStart(anchor ?? new Date(selectedYear, selectedMonth, 1), self.firstWeekday)));
};

export default initWeek;
