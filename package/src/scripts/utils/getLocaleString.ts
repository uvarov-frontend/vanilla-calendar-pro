const getLocaleString = (dateStr: string, locale: string, options: Intl.DateTimeFormatOptions) =>
  new Date(`${dateStr}T00:00:00.000Z`).toLocaleString(locale, options);

export default getLocaleString;
