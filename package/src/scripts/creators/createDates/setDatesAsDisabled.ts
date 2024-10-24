import type { FormatDateString, WeekDayID } from '@package/types';
import type VanillaCalendar from '@src/vanilla-calendar';

const setDaysAsDisabled = (self: VanillaCalendar, date: FormatDateString, dayWeekID: WeekDayID) => {
  const isDisableWeekday = self.settings.range.disableWeekday?.includes(dayWeekID);
  const isDisableAllDaysAndIsRangeEnabled = self.settings.range.disableAllDays && !!self.rangeEnabled?.[0];

  if ((isDisableWeekday || isDisableAllDaysAndIsRangeEnabled) && !self.rangeEnabled?.includes(date) && !self.rangeDisabled?.includes(date)) {
    self.rangeDisabled.push(date);
    self.rangeDisabled?.sort((a, b) => +new Date(a) - +new Date(b));
  }
};

export default setDaysAsDisabled;
