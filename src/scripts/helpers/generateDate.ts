import { FormatDateString } from 'src/types';

const generateDate = (date: Date) => {
	const year = date.getUTCFullYear();
	let month: number | string = date.getUTCMonth() + 1;
	let day: number | string = date.getUTCDate();

	month = month < 10 ? `0${month}` : month;
	day = day < 10 ? `0${day}` : day;

	return `${year}-${month}-${day}` as FormatDateString;
};

export default generateDate;
