import { FormatDateString } from '../../types';
import generateDate from './generateDate';

const parseDates = (dates: FormatDateString[]): FormatDateString[] => {
	const newDates: FormatDateString[] = [];
	dates.forEach((date) => {
		if (date.match(/^(\d{4}-\d{2}-\d{2})$/g)) {
			newDates.push(date);
		} else {
			date.replace(/(\d{4}-\d{2}-\d{2}).*?(\d{4}-\d{2}-\d{2})/g, (_, startDateStr, endDateStr) => {
				const startDate = new Date(`${startDateStr}T00:00:00`);
				const endDate = new Date(`${endDateStr}T00:00:00`);
				const currentDate = new Date(startDate.getTime());

				for (currentDate; currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)) {
					newDates.push(generateDate(currentDate));
				}
				return _;
			});
		}
	});

	return newDates;
};

export default parseDates;
