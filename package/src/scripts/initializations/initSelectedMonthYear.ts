import getDate from '@scripts/helpers/getDate';
import parseDates from '@scripts/helpers/parseDates';
import type VanillaCalendar from '@src/vanilla-calendar';

const initSelectedMonthYear = (self: VanillaCalendar) => {
  if (
    self.jumpToSelectedDate &&
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

  self.selectedMonth = isValidMonth ? Number(self.settings.selected.month) : self.date.today.getMonth();
  self.selectedYear = isValidYear ? Number(self.settings.selected.year) : self.date.today.getFullYear();
  self.viewYear = self.selectedYear;
};

export default initSelectedMonthYear;
