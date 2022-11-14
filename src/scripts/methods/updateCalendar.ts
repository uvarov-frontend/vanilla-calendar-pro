import { IVanillaCalendar } from 'src/types';
import controlArrows from './controlArrows';
import createDays from './createDays';
import createDOM from './createDOM';
import showMonth from './showMonth';
import showYear from './showYear';
import createMonths from './createMonths';
import createTime from './createTime';
import createWeek from './createWeek';
import createYears from './createYears';
import getLocale from './getLocale';
import setVariablesDates from './setVariablesDates';

const update = (self: IVanillaCalendar) => {
	setVariablesDates(self);
	getLocale(self);
	createDOM(self);
	showMonth(self);
	showYear(self);
	controlArrows(self);
	createTime(self);

	if (self.currentType === 'default') {
		createWeek(self);
		createDays(self);
	} else if (self.currentType === 'month') {
		createMonths(self);
	} else if (self.currentType === 'year') {
		createYears(self);
	}
};

export default update;
