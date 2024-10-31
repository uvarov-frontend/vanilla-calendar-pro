import getDate from '@scripts/utils/getDate';
import parseDates from '@scripts/utils/parseDates';
import type VanillaCalendar from '@src/vanilla-calendar';

const initSelectedMonthYear = (self: VanillaCalendar) => {
  if (
    self.enableJumpToSelectedDate &&
    self.settings.selected.dates?.length &&
    self.settings.selected.month === undefined &&
    self.settings.selected.year === undefined
  ) {
    const selectedDate = getDate(parseDates(self.settings.selected.dates)[0]);
    self.settings.selected.month = selectedDate.getMonth();
    self.settings.selected.year = selectedDate.getFullYear();
  }
  const isValidMonth = self.settings.selected.month !== undefined && Number(self.settings.selected.month) >= 0 && Number(self.settings.selected.month) < 12;
  const isValidYear = self.settings.selected.year !== undefined && Number(self.settings.selected.year) >= 0 && Number(self.settings.selected.year) <= 9999;

  self.private.selectedMonth = isValidMonth ? Number(self.settings.selected.month) : self.date.today.getMonth();
  self.private.selectedYear = isValidYear ? Number(self.settings.selected.year) : self.date.today.getFullYear();
  self.private.displayYear = self.private.selectedYear;
};

export default initSelectedMonthYear;
