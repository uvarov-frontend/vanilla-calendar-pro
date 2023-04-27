import { FormatDateString } from '../../types';

const generateDate = (date: Date) => {
	const year = date.getFullYear();
	let month: number | string = date.getMonth() + 1;
	let day: number | string = date.getDate();

	month = month < 10 ? `0${month}` : month;
	day = day < 10 ? `0${day}` : day;

	return `${year}-${month}-${day}` as FormatDateString;
};

export default generateDate;
