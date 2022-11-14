import {
	ArrowNext,
	ArrowPrev,
	Month,
	Year,
	Week,
	Days,
	Months,
	Years,
	WeekNumbers,
	ControlTime,
} from '../templates/Components';

const getComponent = (pattern: string) => {
	let FC = null;

	switch (pattern) {
		case 'ArrowPrev':
			FC = ArrowPrev;
			break;
		case 'ArrowNext':
			FC = ArrowNext;
			break;
		case 'Month':
			FC = Month;
			break;
		case 'Year':
			FC = Year;
			break;
		case 'Week':
			FC = Week;
			break;
		case 'Days':
			FC = Days;
			break;
		case 'Months':
			FC = Months;
			break;
		case 'Years':
			FC = Years;
			break;
		case 'WeekNumbers':
			FC = WeekNumbers;
			break;
		case 'ControlTime':
			FC = ControlTime;
			break;

		// no default
	}
	return FC;
};

export default getComponent;
