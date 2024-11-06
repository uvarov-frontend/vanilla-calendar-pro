import getDate from '@scripts/utils/getDate';
import getLocalDate from '@scripts/utils/getLocalDate';
import parseDates from '@scripts/utils/parseDates';
import type { Calendar, DateAny, FormatDateString } from '@src/index';

const resolveDate = (date: 'today' | Date | number | string | undefined, defaultDate: DateAny): FormatDateString => {
  if (date === 'today') return getLocalDate();
  if (date instanceof Date || typeof date === 'number' || typeof date === 'string') return parseDates([date])[0];
  return defaultDate as FormatDateString;
};

const initRange = (self: Calendar) => {
  // set self.context.displayDateMin, self.context.displayDateMax
  const dateMin = resolveDate(self.dateMin, self.dateMin);
  const dateMax = resolveDate(self.dateMax, self.dateMax);
  const displayDateMin = resolveDate(self.displayDateMin, dateMin);
  const displayDateMax = resolveDate(self.displayDateMax, dateMax);

  self.context.dateToday = resolveDate(self.dateToday, self.dateToday);

  self.context.displayDateMin = displayDateMin ? (getDate(dateMin) >= getDate(displayDateMin) ? dateMin : displayDateMin) : dateMin;
  self.context.displayDateMax = displayDateMax ? (getDate(dateMax) <= getDate(displayDateMax) ? dateMax : displayDateMax) : dateMax;

  const isDisablePast = self.disableDatesPast && !self.disableAllDates && getDate(displayDateMin) < getDate(self.context.dateToday);
  self.context.displayDateMin = isDisablePast ? self.context.dateToday : self.disableAllDates ? self.context.dateToday : displayDateMin;
  self.context.displayDateMax = self.disableAllDates ? self.context.dateToday : displayDateMax;

  // set self.context.disableDates
  self.context.disableDates =
    self.disableDates[0] && !self.disableAllDates ? parseDates(self.disableDates) : self.disableAllDates ? [self.context.displayDateMin] : [];
  if (self.context.disableDates.length > 1) self.context.disableDates.sort((a, b) => +new Date(a) - +new Date(b));

  // set self.context.enableDates
  self.context.enableDates = self.enableDates[0] ? parseDates(self.enableDates) : [];
  if (self.context.enableDates?.[0] && self.context.disableDates?.[0])
    self.context.disableDates = self.context.disableDates.filter((d) => !self.context.enableDates.includes(d));
  if (self.context.enableDates.length > 1) self.context.enableDates.sort((a, b) => +new Date(a) - +new Date(b));

  if (self.context.enableDates?.[0] && self.disableAllDates) {
    self.context.displayDateMin = self.context.enableDates[0];
    self.context.displayDateMax = self.context.enableDates[self.context.enableDates.length - 1];
  }

  // set self.context.dateMin and self.context.dateMax
  self.context.dateMin = self.displayDisabledDates ? dateMin : self.context.displayDateMin;
  self.context.dateMax = self.displayDisabledDates ? dateMax : self.context.displayDateMax;
};

export default initRange;
