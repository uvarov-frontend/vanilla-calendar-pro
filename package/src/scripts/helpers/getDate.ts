import { FormatDateString } from '@src/types';

const getDate = (date: FormatDateString | undefined) => new Date(`${(date as FormatDateString)}T00:00:00`);

export default getDate;
