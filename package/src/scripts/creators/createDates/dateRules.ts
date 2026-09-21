import parseDates from '@scripts/utils/parseDates';
import type { Calendar, FormatDateString } from '@src/index';

type DateRules = {
  holidayKey: string;
  holidays: Set<FormatDateString>;
  selected: Set<FormatDateString>;
  disabled: Set<FormatDateString>;
  enabled: Set<FormatDateString>;
  min: number;
  max: number;
};

const rules = new WeakMap<Calendar, DateRules>();

// Snapshot each synchronous render pass. Refresh after user callbacks as well:
// they may replace arrays, mutate them in place, or change a Date's timestamp.
export const prepareDateRules = (self: Calendar) => {
  const holidays = self.selectedHolidays?.[0] ? self.selectedHolidays : [];
  const holidayKey = JSON.stringify(holidays.map((date) => (date instanceof Date ? date.getTime() : date)));
  const previous = rules.get(self);
  rules.set(self, {
    holidayKey,
    holidays: previous?.holidayKey === holidayKey ? previous.holidays : new Set(parseDates(holidays)),
    selected: new Set(self.context.selectedDates),
    disabled: new Set(self.context.disableDates),
    enabled: new Set(self.context.enableDates),
    min: Date.parse(`${self.context.displayDateMin}T00:00:00`),
    max: Date.parse(`${self.context.displayDateMax}T00:00:00`),
  });
};

export const getDateRules = (self: Calendar) => rules.get(self)!;
export const clearDateRules = (self: Calendar) => rules.delete(self);
