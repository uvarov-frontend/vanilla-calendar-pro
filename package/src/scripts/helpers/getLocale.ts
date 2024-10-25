import messages from '@scripts/helpers/getMessages';
import type VanillaCalendar from '@src/vanilla-calendar';

const capitalizeFirstLetter = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1).replace(/\./, '');

const getLocaleWeekday = (self: VanillaCalendar, dayIndex: number): void => {
  const weekday = new Date(`1978-01-0${dayIndex + 1}T00:00:00.000Z`).toLocaleString(self.settings.lang, { weekday: 'long', timeZone: 'UTC' });
  self.locale.weekday.push(capitalizeFirstLetter(weekday));
};

const getLocaleMonth = (self: VanillaCalendar, monthIndex: number): void => {
  const month = new Date(`1978-${String(monthIndex + 1).padStart(2, '0')}-01T00:00:00.000Z`).toLocaleString(self.settings.lang, {
    month: 'long',
    timeZone: 'UTC',
  });
  self.locale.months.push(capitalizeFirstLetter(month));
};

const getLocale = (self: VanillaCalendar): void => {
  if (self.locale.months.length || self.locale.weekday.length) {
    if (!self.locale.weekday[6] || !self.locale.months[11]) throw new Error(messages.notLocale);
    return;
  }

  Array.from({ length: 7 }, (_, i) => getLocaleWeekday(self, i));
  Array.from({ length: 12 }, (_, i) => getLocaleMonth(self, i));
};

export default getLocale;
