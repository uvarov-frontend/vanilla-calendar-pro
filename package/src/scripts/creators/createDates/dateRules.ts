import parseDates from '@scripts/utils/parseDates';
import type { Calendar, FormatDateString } from '@src/index';

type DateSet = { values: FormatDateString[]; set: Set<FormatDateString> };

// Public arrays may be edited in place by callbacks, including without changing
// their length. Compare a snapshot before reusing membership checks.
const prepareSet = (values: FormatDateString[], previous?: DateSet): DateSet => {
  if (previous && previous.values.length === values.length) {
    let index = 0;
    while (index < values.length && previous.values[index] === values[index]) index++;
    if (index === values.length) return previous;
  }
  return { values: values.slice(), set: new Set(values) };
};

type DateRules = {
  holidayKey: string;
  holidays: Set<FormatDateString>;
  selected: DateSet;
  disabled: DateSet;
  enabled: DateSet;
  min: number;
  max: number;
  first: number;
  last: number;
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
    selected: prepareSet(self.context.selectedDates, previous?.selected),
    disabled: prepareSet(self.context.disableDates, previous?.disabled),
    enabled: prepareSet(self.context.enableDates, previous?.enabled),
    min: Date.parse(`${self.context.displayDateMin}T00:00:00`),
    max: Date.parse(`${self.context.displayDateMax}T00:00:00`),
    first: Date.parse(`${self.context.selectedDates[0]}T00:00:00`),
    last: Date.parse(`${self.context.selectedDates[self.context.selectedDates.length - 1]}T00:00:00`),
  });
};

export const getDateRules = (self: Calendar) => rules.get(self)!;
export const clearDateRules = (self: Calendar) => rules.delete(self);
