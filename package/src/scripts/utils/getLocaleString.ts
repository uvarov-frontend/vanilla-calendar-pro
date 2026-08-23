import type { FormatDateString } from '@src/index';

let formatterKey = '';
let formatter: Intl.DateTimeFormat | undefined;

const getLocaleString = (dateStr: FormatDateString, locale: string, options: Intl.DateTimeFormatOptions) => {
  const key = JSON.stringify([locale, options]);

  if (!formatter || formatterKey !== key) {
    formatter = new Intl.DateTimeFormat(locale, options);
    formatterKey = key;
  }

  return formatter.format(new Date(`${dateStr}T00:00:00.000Z`));
};

export default getLocaleString;
