import type { FormatDateString } from '@package/types';

const getLocalDate = () => {
  const now = new Date();
  return new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().substring(0, 10) as FormatDateString;
};

export default getLocalDate;
