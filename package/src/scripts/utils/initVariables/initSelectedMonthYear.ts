import getDate from '@scripts/utils/getDate';
import parseDates from '@scripts/utils/parseDates';
import setContext from '@scripts/utils/setContext';
import type { Calendar, Range } from '@src/index';
import resolveDate from '@src/scripts/utils/resolveDate';

const displayClosestValidDate = (self: Calendar) => {
  const isBefore = (date1: string | Date, date2: Date) => new Date(date1).getTime() < date2.getTime();
  const isAfter = (date1: string | Date, date2: Date) => new Date(date1).getTime() > date2.getTime();

  const gotoMonthYear = (dateOrStr: Date) => {
    const gotoDate = new Date(dateOrStr);
    setInitialContext(self, gotoDate.getMonth() as Range<12>, gotoDate.getFullYear());
  };

  if (self.displayDateMin && self.displayDateMin !== 'today' && isAfter(self.displayDateMin as string, new Date())) {
    const parsedDate = self.selectedDates.length && self.selectedDates[0] ? parseDates(self.selectedDates)[0] : self.displayDateMin;
    gotoMonthYear(getDate(resolveDate(parsedDate, self.displayDateMin)));
    return true;
  }

  if (self.displayDateMax && self.displayDateMax !== 'today' && isBefore(self.displayDateMax as string, new Date())) {
    const parsedDate = self.selectedDates.length && self.selectedDates[0] ? parseDates(self.selectedDates)[0] : self.displayDateMax;
    gotoMonthYear(getDate(resolveDate(parsedDate, self.displayDateMax)));
    return true;
  }

  return false;
};

const setInitialContext = (self: Calendar, month: Range<12>, year: number) => {
  setContext(self, 'selectedMonth', month);
  setContext(self, 'selectedYear', year);
  setContext(self, 'displayYear', year);
};

const initSelectedMonthYear = (self: Calendar) => {
  const isJumpToSelectedDate = self.enableJumpToSelectedDate && self.selectedDates?.[0] && self.selectedMonth === undefined && self.selectedYear === undefined;

  if (isJumpToSelectedDate) {
    const selectedDate = getDate(parseDates(self.selectedDates)[0]);
    setInitialContext(self, selectedDate.getMonth() as Range<12>, selectedDate.getFullYear());
    return;
  }

  if (displayClosestValidDate(self)) return;

  const isValidMonth = self.selectedMonth !== undefined && Number(self.selectedMonth) >= 0 && Number(self.selectedMonth) < 12;
  const isValidYear = self.selectedYear !== undefined && Number(self.selectedYear) >= 0 && Number(self.selectedYear) <= 9999;

  setInitialContext(
    self,
    (isValidMonth ? Number(self.selectedMonth) : getDate(self.context.dateToday).getMonth()) as Range<12>,
    isValidYear ? Number(self.selectedYear) : getDate(self.context.dateToday).getFullYear(),
  );
};

export default initSelectedMonthYear;
