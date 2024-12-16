import create from '@scripts/creators/create';
import handleDayRangedSelection from '@scripts/handles/handleSelectDateRange/handleSelectDateRange';
import initAllVariables from '@scripts/utils/initVariables/initAllVariables';
import setContext from '@scripts/utils/setContext';
import type { Calendar, Reset } from '@src/index';

const reset = (self: Calendar, { year, month, dates, time, locale }: Reset, recreate = true) => {
  const previousSelected = {
    year: self.selectedYear,
    month: self.selectedMonth,
    dates: self.selectedDates,
    time: self.selectedTime,
  };

  self.selectedYear = year ? previousSelected.year : self.context.selectedYear;
  self.selectedMonth = month ? previousSelected.month : self.context.selectedMonth;
  self.selectedTime = time ? previousSelected.time : self.context.selectedTime;

  self.selectedDates =
    dates === 'only-first' && self.context.selectedDates?.[0]
      ? [self.context.selectedDates[0]]
      : dates === true
        ? previousSelected.dates
        : self.context.selectedDates;

  if (locale) {
    const locale = {
      months: { short: [], long: [] },
      weekdays: { short: [], long: [] },
    };
    setContext(self, 'locale', locale);
  }

  initAllVariables(self);
  if (recreate) create(self);

  self.selectedYear = previousSelected.year;
  self.selectedMonth = previousSelected.month;
  self.selectedDates = previousSelected.dates;
  self.selectedTime = previousSelected.time;
  if (self.selectionDatesMode === 'multiple-ranged' && dates) handleDayRangedSelection(self, null);
};

export default reset;
