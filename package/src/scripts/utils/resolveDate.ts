import getLocalDate from '@scripts/utils/getLocalDate';
import parseDates from '@scripts/utils/parseDates';
import type { DateAny, FormatDateString } from '@src/index';

const resolveDate = (date: 'today' | Date | number | string | undefined, defaultDate: DateAny): FormatDateString => {
  if (date === 'today') return getLocalDate();
  if (date instanceof Date || typeof date === 'number' || typeof date === 'string') return parseDates([date])[0];
  return defaultDate as FormatDateString;
};

export default resolveDate;
