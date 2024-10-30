import errorMessages from '@scripts/utils/getErrorMessages';
import type VanillaCalendar from '@src/vanilla-calendar';

const capitalizeFirstLetter = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1).replace(/\./, '');

const getLocaleWeekday = (self: VanillaCalendar, dayIndex: number): void => {
  const date = new Date(`1978-01-0${dayIndex + 1}T00:00:00.000Z`);
  const weekdayShort = date.toLocaleString(self.settings.lang, { weekday: 'short', timeZone: 'UTC' });
  const weekdayLong = date.toLocaleString(self.settings.lang, { weekday: 'long', timeZone: 'UTC' });
  self.locale.weekday.short.push(capitalizeFirstLetter(weekdayShort));
  self.locale.weekday.long.push(capitalizeFirstLetter(weekdayLong));
};

const getLocaleMonth = (self: VanillaCalendar, monthIndex: number): void => {
  const date = new Date(`1978-${String(monthIndex + 1).padStart(2, '0')}-01T00:00:00.000Z`);
  const monthShort = date.toLocaleString(self.settings.lang, { month: 'short', timeZone: 'UTC' });
  const monthLong = date.toLocaleString(self.settings.lang, { month: 'long', timeZone: 'UTC' });
  self.locale.months.short.push(capitalizeFirstLetter(monthShort));
  self.locale.months.long.push(capitalizeFirstLetter(monthLong));
};

const getLocale = (self: VanillaCalendar): void => {
  if (self.locale.months.short.length || self.locale.months.long.length || self.locale.weekday.short.length || self.locale.weekday.long.length) {
    if (!self.locale.weekday.short[6] || !self.locale.weekday.long[6] || !self.locale.months.short[11] || !self.locale.months.long[11])
      throw new Error(errorMessages.notLocale);
    return;
  }

  Array.from({ length: 7 }, (_, i) => getLocaleWeekday(self, i));
  Array.from({ length: 12 }, (_, i) => getLocaleMonth(self, i));
};

export default getLocale;
