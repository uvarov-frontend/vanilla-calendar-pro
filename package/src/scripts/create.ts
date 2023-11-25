import { IVanillaCalendar } from '@src/types';
import getLocale from '@scripts/helpers/getLocale';
import visibilityArrows from '@scripts/methods/visibilityArrows';
import createDays from '@scripts/methods/createDays';
import createDOM from '@scripts/methods/createDOM';
import showMonth from '@scripts/methods/showMonth';
import showYear from '@scripts/methods/showYear';
import createMonths from '@scripts/methods/createMonths';
import createTime from '@scripts/methods/createTime';
import createWeek from '@scripts/methods/createWeek';
import createYears from '@scripts/methods/createYears';
import changeTheme from '@scripts/methods/changeTheme';

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

	changeTheme(self);
	getLocale(self);
	createDOM(self);
	showMonth(self);
	showYear(self);
	visibilityArrows(self);
	createTime(self);

	typeMapper[self.currentType]();
};

export default create;
