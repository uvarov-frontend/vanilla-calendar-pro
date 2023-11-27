import VanillaCalendar from '@src/vanilla-calendar';
import getLocale from '@scripts/helpers/getLocale';
import visibilityArrows from '@scripts/methods/visibilityArrows';
import createDays from '@scripts/methods/createDays';
import createDOM from '@scripts/methods/createDOM';
import visibilityTitle from '@scripts/methods/visibilityTitle';
import createMonths from '@scripts/methods/createMonths';
import createTime from '@scripts/methods/createTime';
import createWeek from '@scripts/methods/createWeek';
import createYears from '@scripts/methods/createYears';
import changeTheme from '@scripts/methods/changeTheme';

const create = (self: VanillaCalendar) => {
	const types = {
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
	visibilityTitle(self);
	visibilityArrows(self);
	createTime(self);

	types[self.currentType]();
};

export default create;
