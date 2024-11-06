import getDate from '@scripts/utils/getDate';
import parseDates from '@scripts/utils/parseDates';
import type { Calendar, Range } from '@src/index';

const initSelectedMonthYear = (self: Calendar) => {
  const isJumpToSelectedDate = self.enableJumpToSelectedDate && self.selectedDates?.[0] && self.selectedMonth === undefined && self.selectedYear === undefined;

  if (isJumpToSelectedDate) {
    const selectedDate = getDate(parseDates(self.selectedDates)[0]);
    self.context.selectedMonth = selectedDate.getMonth() as Range<12>;
    self.context.selectedYear = selectedDate.getFullYear();
    return;
  }

  const isValidMonth = self.selectedMonth !== undefined && Number(self.selectedMonth) >= 0 && Number(self.selectedMonth) < 12;
  const isValidYear = self.selectedYear !== undefined && Number(self.selectedYear) >= 0 && Number(self.selectedYear) <= 9999;

  self.context.selectedMonth = (isValidMonth ? Number(self.selectedMonth) : getDate(self.context.dateToday).getMonth()) as Range<12>;
  self.context.selectedYear = isValidYear ? Number(self.selectedYear) : getDate(self.context.dateToday).getFullYear();
  self.context.displayYear = self.context.selectedYear;
};

export default initSelectedMonthYear;
