import { FormatDateString } from '../../types';
import generateDate from './generateDate';

const parserDates = (dates: string[]) => {
	const newDates: FormatDateString[] = [];
	dates.forEach((date) => {
		if (date.match(/^(\d{4}-\d{2}-\d{2})$/g)) {
			newDates.push(date as FormatDateString);
		} else {
			date.replace(/(\d{4}-\d{2}-\d{2}).*?(\d{4}-\d{2}-\d{2})/g, (_, d1, d2) => {
				const startDate = new Date(`${d1} 00:00:00`);
				const endDate = new Date(`${d2} 00:00:00`);
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

export default parserDates;
