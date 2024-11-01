import getDate from '@scripts/utils/getDate';
import getDateString from '@scripts/utils/getDateString';
import getLocalDate from '@scripts/utils/getLocalDate';
import parseDates from '@scripts/utils/parseDates';
import type VanillaCalendar from '@src/vanilla-calendar';

const initRange = (self: VanillaCalendar) => {
  // set self.private.displayDateMin and self.private.displayDateMax
  if (self.dateMin === 'today') self.dateMin = getLocalDate();
  if (self.dateMax === 'today') self.dateMax = getLocalDate();

  if (self.displayDateMin === 'today') self.displayDateMin = getLocalDate();
  if (self.displayDateMax === 'today') self.displayDateMax = getLocalDate();

  self.displayDateMin = self.displayDateMin ? (getDate(self.dateMin) >= getDate(self.displayDateMin) ? self.dateMin : self.displayDateMin) : self.dateMin;

  self.displayDateMax = self.displayDateMax ? (getDate(self.dateMax) <= getDate(self.displayDateMax) ? self.dateMax : self.displayDateMax) : self.dateMax;

  const isDisablePast = self.settings.range.disablePast && !self.settings.range.disableAllDays && getDate(self.displayDateMin) < self.dateToday;
  self.private.displayDateMin = isDisablePast
    ? getDateString(self.dateToday)
    : self.settings.range.disableAllDays
      ? getDateString(self.dateToday)
      : self.displayDateMin;
  self.private.displayDateMax = self.settings.range.disableAllDays ? getDateString(self.dateToday) : self.displayDateMax;

  // set self.private.disableDates
  self.private.disableDates =
    self.settings.range.disabled && !self.settings.range.disableAllDays
      ? parseDates(self.settings.range.disabled)
      : self.settings.range.disableAllDays
        ? [self.private.displayDateMin]
        : [];
  if (self.private.disableDates.length > 1) self.private.disableDates.sort((a, b) => +new Date(a) - +new Date(b));

  // set self.private.enableDates
  self.private.enableDates = self.settings.range.enabled ? parseDates(self.settings.range.enabled) : [];
  if (self.private.enableDates?.[0] && self.private.disableDates?.[0])
    self.private.disableDates = self.private.disableDates.filter((d) => !self.private.enableDates.includes(d));
  if (self.private.enableDates.length > 1) self.private.enableDates.sort((a, b) => +new Date(a) - +new Date(b));

  if (self.private.enableDates?.[0] && self.settings.range.disableAllDays) {
    self.private.displayDateMin = self.private.enableDates[0];
    self.private.displayDateMax = self.private.enableDates[self.private.enableDates.length - 1];
  }
};

export default initRange;
