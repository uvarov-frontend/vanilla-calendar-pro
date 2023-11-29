import { FormatDateString } from '@package/types';

const getDate = (date: FormatDateString) => new Date(`${date}T00:00:00`);

export default getDate;
