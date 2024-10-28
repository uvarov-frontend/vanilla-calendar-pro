import getDate from '@scripts/helpers/getDate';
import getDateString from '@scripts/helpers/getDateString';
import getLocalDate from '@scripts/helpers/getLocalDate';
import parseDates from '@scripts/helpers/parseDates';
import type VanillaCalendar from '@src/vanilla-calendar';

const initRange = (self: VanillaCalendar) => {
  // set self.rangeMin and self.rangeMax
  if (self.date.min === 'today') self.date.min = getLocalDate();
  if (self.date.max === 'today') self.date.max = getLocalDate();

  if (self.settings.range.min === 'today') self.settings.range.min = getLocalDate();
  if (self.settings.range.max === 'today') self.settings.range.max = getLocalDate();

  self.settings.range.min = self.settings.range.min
    ? getDate(self.date.min) >= getDate(self.settings.range.min)
      ? self.date.min
      : self.settings.range.min
    : self.date.min;

  self.settings.range.max = self.settings.range.max
    ? getDate(self.date.max) <= getDate(self.settings.range.max)
      ? self.date.max
      : self.settings.range.max
    : self.date.max;

  const isDisablePast = self.settings.range.disablePast && !self.settings.range.disableAllDays && getDate(self.settings.range.min) < self.date.today;
  self.rangeMin = isDisablePast
    ? getDateString(self.date.today)
    : self.settings.range.disableAllDays
      ? getDateString(self.date.today)
      : self.settings.range.min;
  self.rangeMax = self.settings.range.disableAllDays ? getDateString(self.date.today) : self.settings.range.max;

  // set self.rangeDisabled
  self.rangeDisabled =
    self.settings.range.disabled && !self.settings.range.disableAllDays
      ? parseDates(self.settings.range.disabled)
      : self.settings.range.disableAllDays
        ? [self.rangeMin]
        : [];
  if (self.rangeDisabled.length > 1) self.rangeDisabled.sort((a, b) => +new Date(a) - +new Date(b));

  // set self.rangeEnabled
  self.rangeEnabled = self.settings.range.enabled ? parseDates(self.settings.range.enabled) : [];
  if (self.rangeEnabled?.[0] && self.rangeDisabled?.[0]) self.rangeDisabled = self.rangeDisabled.filter((d) => !self.rangeEnabled.includes(d));
  if (self.rangeEnabled.length > 1) self.rangeEnabled.sort((a, b) => +new Date(a) - +new Date(b));

  if (self.rangeEnabled?.[0] && self.settings.range.disableAllDays) {
    self.rangeMin = self.rangeEnabled[0];
    self.rangeMax = self.rangeEnabled[self.rangeEnabled.length - 1];
  }
};

export default initRange;
