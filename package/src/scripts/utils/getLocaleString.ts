import type { FormatDateString } from '@src/index';

const getLocaleString = (dateStr: FormatDateString, locale: string, options: Intl.DateTimeFormatOptions) =>
  new Date(`${dateStr}T00:00:00.000Z`).toLocaleString(locale, options);

export default getLocaleString;
