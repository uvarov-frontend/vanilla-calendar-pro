import getDate from '@scripts/utils/getDate';
import getLocalDate from '@scripts/utils/getLocalDate';
import parseDates from '@scripts/utils/parseDates';
import type { VanillaCalendarPro } from '@src/index';

const initRange = (self: VanillaCalendarPro) => {
  // set self.private.displayDateMin, self.private.displayDateMax
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

  self.private.dateToday =
    self.dateToday === 'today'
      ? getLocalDate()
      : self.dateToday instanceof Date || typeof self.dateToday === 'number'
        ? parseDates([self.dateToday])[0]
        : self.dateToday;

  self.private.displayDateMin = displayDateMin ? (getDate(dateMin) >= getDate(displayDateMin) ? dateMin : displayDateMin) : dateMin;
  self.private.displayDateMax = displayDateMax ? (getDate(dateMax) <= getDate(displayDateMax) ? dateMax : displayDateMax) : dateMax;

  const isDisablePast = self.disableDatesPast && !self.disableAllDates && getDate(displayDateMin) < getDate(self.private.dateToday);
  self.private.displayDateMin = isDisablePast ? self.private.dateToday : self.disableAllDates ? self.private.dateToday : displayDateMin;
  self.private.displayDateMax = self.disableAllDates ? self.private.dateToday : displayDateMax;

  // set self.private.disableDates
  self.private.disableDates =
    self.disableDates[0] && !self.disableAllDates ? parseDates(self.disableDates) : self.disableAllDates ? [self.private.displayDateMin] : [];
  if (self.private.disableDates.length > 1) self.private.disableDates.sort((a, b) => +new Date(a) - +new Date(b));

  // set self.private.enableDates
  self.private.enableDates = self.enableDates[0] ? parseDates(self.enableDates) : [];
  if (self.private.enableDates?.[0] && self.private.disableDates?.[0])
    self.private.disableDates = self.private.disableDates.filter((d) => !self.private.enableDates.includes(d));
  if (self.private.enableDates.length > 1) self.private.enableDates.sort((a, b) => +new Date(a) - +new Date(b));

  if (self.private.enableDates?.[0] && self.disableAllDates) {
    self.private.displayDateMin = self.private.enableDates[0];
    self.private.displayDateMax = self.private.enableDates[self.private.enableDates.length - 1];
  }

  // set self.private.dateMin and self.private.dateMax
  self.private.dateMin = self.displayDisabledDates ? dateMin : self.private.displayDateMin;
  self.private.dateMax = self.displayDisabledDates ? dateMax : self.private.displayDateMax;
};

export default initRange;
