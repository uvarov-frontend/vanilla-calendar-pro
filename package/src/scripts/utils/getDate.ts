import type { FormatDateString } from '@src/index';

const getDate: (date: FormatDateString) => Date = (date: FormatDateString) => new Date(`${date}T00:00:00`);

export default getDate;
