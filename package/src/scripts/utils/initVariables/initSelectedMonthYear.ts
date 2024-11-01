import getDate from '@scripts/utils/getDate';
import parseDates from '@scripts/utils/parseDates';
import type VanillaCalendar from '@src/vanilla-calendar';

const initSelectedMonthYear = (self: VanillaCalendar) => {
  if (
    self.enableJumpToSelectedDate &&
    self.selectedDates?.length &&
    self.selectedMonth === undefined &&
    self.selectedYear === undefined
  ) {
    const selectedDate = getDate(parseDates(self.selectedDates)[0]);
    self.selectedMonth = selectedDate.getMonth();
    self.selectedYear = selectedDate.getFullYear();
  }
  const isValidMonth = self.selectedMonth !== undefined && Number(self.selectedMonth) >= 0 && Number(self.selectedMonth) < 12;
  const isValidYear = self.selectedYear !== undefined && Number(self.selectedYear) >= 0 && Number(self.selectedYear) <= 9999;

  self.private.selectedMonth = isValidMonth ? Number(self.selectedMonth) : self.dateToday.getMonth();
  self.private.selectedYear = isValidYear ? Number(self.selectedYear) : self.dateToday.getFullYear();
  self.private.displayYear = self.private.selectedYear;
};

export default initSelectedMonthYear;
