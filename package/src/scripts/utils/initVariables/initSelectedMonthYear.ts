import getDate from '@scripts/utils/getDate';
import parseDates from '@scripts/utils/parseDates';
import type { VanillaCalendarPro } from '@src/index';

const initSelectedMonthYear = (self: VanillaCalendarPro) => {
  const isJumpToSelectedDate = self.enableJumpToSelectedDate && self.selectedDates?.[0] && self.selectedMonth === undefined && self.selectedYear === undefined;

  if (isJumpToSelectedDate) {
    const selectedDate = getDate(parseDates(self.selectedDates)[0]);
    self.private.selectedMonth = selectedDate.getMonth();
    self.private.selectedYear = selectedDate.getFullYear();
    return;
  }

  const isValidMonth = self.selectedMonth !== undefined && Number(self.selectedMonth) >= 0 && Number(self.selectedMonth) < 12;
  const isValidYear = self.selectedYear !== undefined && Number(self.selectedYear) >= 0 && Number(self.selectedYear) <= 9999;

  self.private.selectedMonth = isValidMonth ? Number(self.selectedMonth) : getDate(self.private.dateToday).getMonth();
  self.private.selectedYear = isValidYear ? Number(self.selectedYear) : getDate(self.private.dateToday).getFullYear();
  self.private.displayYear = self.private.selectedYear;
};

export default initSelectedMonthYear;
