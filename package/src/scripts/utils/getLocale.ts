import errorMessages from '@scripts/utils/getErrorMessages';
import setContext from '@scripts/utils/setContext';
import type { Calendar, LocaleStated } from '@src/index';

const capitalizeFirstLetter = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1).replace(/\./, '');

const locales = new Map<string, LocaleStated>();

const getNames = (locale: string, unit: 'weekday' | 'month', length: 'short' | 'long') => {
  const formatter = new Intl.DateTimeFormat(locale, { [unit]: length, timeZone: 'UTC' });
  return Array.from({ length: unit === 'weekday' ? 7 : 12 }, (_, index) =>
    capitalizeFirstLetter(formatter.format(new Date(Date.UTC(1978, unit === 'month' ? index : 0, unit === 'weekday' ? index + 1 : 1)))),
  );
};

const getLocale = (self: Calendar): void => {
  const isHasContextLocale =
    self.context.locale.weekdays.short[6] &&
    self.context.locale.weekdays.long[6] &&
    self.context.locale.months.short[11] &&
    self.context.locale.months.long[11];

  if (isHasContextLocale) return;

  if (typeof self.locale !== 'string') {
    const isManually = self.locale?.weekdays?.short[6] && self.locale?.weekdays?.long[6] && self.locale?.months?.short[11] && self.locale?.months?.long[11];
    if (!isManually) throw new Error(errorMessages.notLocale);
    setContext(self, 'locale', { ...self.locale });
    return;
  }

  if (typeof self.locale === 'string' && !self.locale.length) throw new Error(errorMessages.notLocale);

  let locale = locales.get(self.locale);
  if (!locale) {
    locale = {
      weekdays: { short: getNames(self.locale, 'weekday', 'short'), long: getNames(self.locale, 'weekday', 'long') },
      months: { short: getNames(self.locale, 'month', 'short'), long: getNames(self.locale, 'month', 'long') },
    };
    if (locales.size >= 8) locales.delete(locales.keys().next().value as string);
    locales.set(self.locale, locale);
  }
  // The cached arrays are private; callbacks may edit an instance's locale.
  for (const unit of ['weekdays', 'months'] as const) {
    for (const length of ['short', 'long'] as const) self.context.locale[unit][length].push(...locale[unit][length]);
  }
};

export default getLocale;
