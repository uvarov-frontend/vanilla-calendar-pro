import parseDates from '@scripts/utils/parseDates';
import sortDates from '@scripts/utils/sortDates';
import type { Calendar, FormatDateString } from '@src/index';

type Rule = 'disableDates' | 'enableDates';
type ParsedRule = { values: Array<string | number>; dates: FormatDateString[]; timezone: string };
const cache = new WeakMap<Calendar, Partial<Record<Rule, ParsedRule>>>();

const parseDateRules = (self: Calendar, rule: Rule) => {
  const values = self[rule].map((value) => (value instanceof Date ? value.getTime() : value));
  const rules = cache.get(self);
  const previous = rules?.[rule];
  // Parsing uses local date arithmetic. A timezone change must invalidate a
  // cached range even if the original options have not changed.
  if (previous && values.length === previous.values.length) {
    let index = 0;
    while (index < values.length && values[index] === previous.values[index]) index++;
    if (index === values.length && previous.timezone === new Intl.DateTimeFormat().resolvedOptions().timeZone) return previous.dates.slice();
  }

  const dates = parseDates(self[rule]);
  if (dates.length > 1) sortDates(dates);
  // Small rules are cheap to parse. Bound retained data for large rule sets,
  // and never share the cached array with the publicly mutable context.
  if (dates.length > 128 && dates.length <= 10000 && values.length <= 10000) {
    const next = rules ?? {};
    next[rule] = { values, dates: dates.slice(), timezone: new Intl.DateTimeFormat().resolvedOptions().timeZone };
    cache.set(self, next);
  } else if (rules) {
    delete rules[rule];
  }
  return dates;
};

export default parseDateRules;
