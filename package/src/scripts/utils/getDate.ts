import type { FormatDateString } from '@src/index';

const getDate = (date: FormatDateString): Date => new Date(`${date}T00:00:00.000Z`);

export default getDate;
