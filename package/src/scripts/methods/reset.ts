import create from '@scripts/creators/create';
import handleDayRangedSelection from '@scripts/handles/handleSelectDateRange';
import initAllVariables from '@scripts/utils/initVariables/initAllVariables';
import type { Reset } from '@src/types';
import type { VanillaCalendar } from '@src/vanilla-calendar';

const reset = (self: VanillaCalendar, { year, month, dates, time, locale }: Reset = {}) => {
  const previousSelected = {
    year: self.selectedYear,
    month: self.selectedMonth,
    dates: self.selectedDates,
    time: self.selectedTime,
  };

  self.selectedYear = year ? previousSelected.year : self.private.selectedYear;
  self.selectedMonth = month ? previousSelected.month : self.private.selectedMonth;
  self.selectedTime = time ? previousSelected.time : self.private.selectedTime;

  self.selectedDates =
    dates === 'only-first' && self.private.selectedDates?.[0]
      ? [self.private.selectedDates[0]]
      : dates === true
        ? previousSelected.dates
        : self.private.selectedDates;

  if (locale) {
    self.private.locale = {
      months: { short: [], long: [] },
      weekdays: { short: [], long: [] },
    };
  }

  initAllVariables(self);
  create(self);

  self.selectedYear = previousSelected.year;
  self.selectedMonth = previousSelected.month;
  self.selectedDates = previousSelected.dates;
  self.selectedTime = previousSelected.time;
  if (self.selectionDatesMode === 'multiple-ranged' && dates) handleDayRangedSelection(self);
};

export default reset;
