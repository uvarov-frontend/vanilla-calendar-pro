import getWeekNumber from '@scripts/utils/getWeekNumber';
import type { Calendar, FormatDateString } from '@src/index';

const addWeekNumberForDate = (self: Calendar, dateEl: HTMLElement, dateStr: FormatDateString) => {
  const weekNumber = getWeekNumber(dateStr, self.firstWeekday);
  if (!weekNumber) return;
  dateEl.dataset.vcDateWeekNumber = String(weekNumber.week);
};

export default addWeekNumberForDate;
