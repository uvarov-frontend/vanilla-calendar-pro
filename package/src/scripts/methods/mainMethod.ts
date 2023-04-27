import { IVanillaCalendar } from '../../types';
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
import setTheme from './setTheme';

const mainMethod = (self: IVanillaCalendar) => {
	setTheme(self);
	getLocale(self);
	createDOM(self);
	showMonth(self);
	showYear(self);
	controlArrows(self);
	createTime(self);

	if (self.currentType === 'default' || self.currentType === 'multiple') {
		createWeek(self);
		createDays(self);
	} else if (self.currentType === 'month') {
		createMonths(self);
	} else if (self.currentType === 'year') {
		createYears(self);
	}
};

export default mainMethod;
