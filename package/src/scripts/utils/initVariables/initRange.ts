import getDate from '@scripts/utils/getDate';
import getLocalDate from '@scripts/utils/getLocalDate';
import parseDates from '@scripts/utils/parseDates';
import type { Calendar } from '@src/index';

const initRange = (self: Calendar) => {
  // set self.context.displayDateMin, self.context.displayDateMax
  const dateMin =
    self.dateMin === 'today' ? getLocalDate() : self.dateMin instanceof Date || typeof self.dateMin === 'number' ? parseDates([self.dateMin])[0] : self.dateMin;
  const dateMax =
    self.dateMax === 'today' ? getLocalDate() : self.dateMax instanceof Date || typeof self.dateMax === 'number' ? parseDates([self.dateMax])[0] : self.dateMax;
  const displayDateMin =
    self.displayDateMin === 'today'
      ? getLocalDate()
      : self.displayDateMin instanceof Date || typeof self.displayDateMin === 'number'
        ? parseDates([self.displayDateMin])[0]
        : dateMin;
  const displayDateMax =
    self.displayDateMax === 'today'
      ? getLocalDate()
      : self.displayDateMax instanceof Date || typeof self.displayDateMax === 'number'
        ? parseDates([self.displayDateMax])[0]
        : dateMax;

  self.context.dateToday =
    self.dateToday === 'today'
      ? getLocalDate()
      : self.dateToday instanceof Date || typeof self.dateToday === 'number'
        ? parseDates([self.dateToday])[0]
        : self.dateToday;

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
