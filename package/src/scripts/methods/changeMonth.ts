import { IVanillaCalendar } from '../../types';
import controlArrows from './controlArrows';
import createDays from './createDays';
import showMonth from './showMonth';
import showYear from './showYear';

const changeMonth = (self: IVanillaCalendar, route: string | undefined) => {
	if (self.selectedMonth === undefined || self.selectedYear === undefined) return;
	const jumpDate = new Date(self.selectedYear, self.selectedMonth, 1);

	switch (route) {
		case 'prev':
			jumpDate.setMonth(jumpDate.getMonth() - self.jumpMonths);
			break;
		case 'next':
			jumpDate.setMonth(jumpDate.getMonth() + self.jumpMonths);
			break;
		// no default
	}

	self.selectedMonth = jumpDate.getMonth();
	self.selectedYear = jumpDate.getFullYear();

	showMonth(self);
	showYear(self);
	controlArrows(self);
	createDays(self);
};

export default changeMonth;
