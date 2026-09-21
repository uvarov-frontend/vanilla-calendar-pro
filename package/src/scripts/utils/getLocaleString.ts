import type { FormatDateString } from '@src/index';

const formatters = new Map<string, Intl.DateTimeFormat>();
const labels = new Map<string, string>();

const getLocaleString = (dateStr: FormatDateString, locale: string) => {
  const key = `${locale}:${dateStr}`;
  const cached = labels.get(key);
  if (cached !== undefined) return cached;

  let formatter = formatters.get(locale);
  if (!formatter) {
    formatter = new Intl.DateTimeFormat(locale, { dateStyle: 'long', timeZone: 'UTC' });
    if (formatters.size >= 8) formatters.delete(formatters.keys().next().value);
    formatters.set(locale, formatter);
  }

  const label = formatter.format(new Date(`${dateStr}T00:00:00.000Z`));
  // Bound the shared cache even when calendars visit many years and locales.
  if (labels.size >= 512) labels.delete(labels.keys().next().value);
  labels.set(key, label);
  return label;
};

export default getLocaleString;
