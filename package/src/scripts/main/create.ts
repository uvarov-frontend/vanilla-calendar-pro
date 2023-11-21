import { IVanillaCalendar } from '@src/types';
import getLocale from '@scripts/helpers/getLocale';
import updateVisibilityArrows from '@scripts/methods/updateVisibilityArrows';
import createDays from '@scripts/methods/createDays';
import createDOM from '@scripts/methods/createDOM';
import showMonth from '@scripts/methods/showMonth';
import showYear from '@scripts/methods/showYear';
import createMonths from '@scripts/methods/createMonths';
import createTime from '@scripts/methods/createTime';
import createWeek from '@scripts/methods/createWeek';
import createYears from '@scripts/methods/createYears';
import setTheme from '@scripts/methods/setTheme';

const create = (self: IVanillaCalendar) => {
	const typeMapper = {
		default: () => {
			createWeek(self);
			createDays(self);
		},
		multiple: () => {
			createWeek(self);
			createDays(self);
		},
		month: () => createMonths(self),
		year: () => createYears(self),
	};

	setTheme(self);
	getLocale(self);
	createDOM(self);
	showMonth(self);
	showYear(self);
	updateVisibilityArrows(self);
	createTime(self);

	typeMapper[self.currentType]();
};

export default create;
