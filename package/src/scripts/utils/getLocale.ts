import errorMessages from '@scripts/utils/getErrorMessages';
import type { VanillaCalendar } from '@src/vanilla-calendar';

const capitalizeFirstLetter = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1).replace(/\./, '');

const getLocaleWeekday = (self: VanillaCalendar, dayIndex: number, locale: string): void => {
  const date = new Date(`1978-01-0${dayIndex + 1}T00:00:00.000Z`);
  const weekdayShort = date.toLocaleString(locale, { weekday: 'short', timeZone: 'UTC' });
  const weekdayLong = date.toLocaleString(locale, { weekday: 'long', timeZone: 'UTC' });
  self.private.locale.weekdays.short.push(capitalizeFirstLetter(weekdayShort));
  self.private.locale.weekdays.long.push(capitalizeFirstLetter(weekdayLong));
};

const getLocaleMonth = (self: VanillaCalendar, monthIndex: number, locale: string): void => {
  const date = new Date(`1978-${String(monthIndex + 1).padStart(2, '0')}-01T00:00:00.000Z`);
  const monthShort = date.toLocaleString(locale, { month: 'short', timeZone: 'UTC' });
  const monthLong = date.toLocaleString(locale, { month: 'long', timeZone: 'UTC' });
  self.private.locale.months.short.push(capitalizeFirstLetter(monthShort));
  self.private.locale.months.long.push(capitalizeFirstLetter(monthLong));
};

const getLocale = (self: VanillaCalendar): void => {
  const isHasPrivateLocale =
    self.private.locale.weekdays.short[6] &&
    self.private.locale.weekdays.long[6] &&
    self.private.locale.months.short[11] &&
    self.private.locale.months.long[11];

  if (isHasPrivateLocale) return;

  if (typeof self.locale !== 'string') {
    const isManually = self.locale?.weekdays?.short[6] && self.locale?.weekdays?.long[6] && self.locale?.months?.short[11] && self.locale?.months?.long[11];
    if (!isManually) throw new Error(errorMessages.notLocale);
    self.private.locale = { ...self.locale };
    return;
  }

  if (typeof self.locale === 'string' && !self.locale.length) throw new Error(errorMessages.notLocale);

  Array.from({ length: 7 }, (_, i) => getLocaleWeekday(self, i, self.locale as string));
  Array.from({ length: 12 }, (_, i) => getLocaleMonth(self, i, self.locale as string));
};

export default getLocale;
