import { IVanillaCalendar } from 'src/types';
import controlArrows from './controlArrows';
import createDays from './createDays';
import showMonth from './showMonth';
import showYear from './showYear';

const changeMonth = (self: IVanillaCalendar, route: string | undefined) => {
	if (self.selectedMonth === undefined || self.selectedYear === undefined) return;
	const lastMonth = self.locale.months.length - 1;

	switch (route) {
		case 'prev':
			if (self.selectedMonth !== 0) {
				self.selectedMonth -= 1;
			} else if (self.settings.selection.year) {
				self.selectedYear -= 1;
				self.selectedMonth = lastMonth;
			}
			break;
		case 'next':
			if (self.selectedMonth !== lastMonth) {
				self.selectedMonth += 1;
			} else if (self.settings.selection.year) {
				self.selectedYear += 1;
				self.selectedMonth = 0;
			}
			break;
		// no default
	}

	self.settings.selected.month = self.selectedMonth;
	self.settings.selected.year = self.selectedYear;

	showMonth(self);
	showYear(self);
	controlArrows(self);
	createDays(self);
};

export default changeMonth;
