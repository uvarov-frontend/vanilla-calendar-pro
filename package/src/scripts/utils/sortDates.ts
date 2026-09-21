import type { FormatDateString } from '@src/index';

const sortDates = (dates: FormatDateString[]) => {
  if (dates.length < 3 || (dates as Array<FormatDateString | undefined>).includes(undefined)) return dates.sort((a, b) => +new Date(a) - +new Date(b));
  // Parse once per entry, rather than on every comparison. Keep the numeric
  // comparator and the original array, including its handling of invalid dates.
  const entries = dates.map((date) => ({ date, time: +new Date(date) }));
  entries.sort((a, b) => a.time - b.time);
  entries.forEach((entry, index) => (dates[index] = entry.date));
  return dates;
};

export default sortDates;
