import { IVanillaCalendar } from '@src/types';
import generateDate from '@scripts/helpers/generateDate';

import updateVisibilityArrows from '@scripts/methods/updateVisibilityArrows';
import createDays from '@scripts/methods/createDays';
import showMonth from '@scripts/methods/showMonth';
import showYear from '@scripts/methods/showYear';

const changeMonth = (self: IVanillaCalendar, route: 'prev' | 'next') => {
	const { selectedMonth, selectedYear, jumpMonths } = self;

	if (selectedMonth === undefined || selectedYear === undefined) return;
	const jumpDate = new Date(`${generateDate(new Date(selectedYear, selectedMonth, 1))}T00:00:00`);

	const routeMap: Record<string, () => void> = {
		prev: () => jumpDate.setMonth(jumpDate.getMonth() - jumpMonths),
		next: () => jumpDate.setMonth(jumpDate.getMonth() + jumpMonths),
	};

	routeMap[route]();

	[self.selectedMonth, self.selectedYear] = [jumpDate.getMonth(), jumpDate.getFullYear()];

	showMonth(self);
	showYear(self);
	updateVisibilityArrows(self);
	createDays(self);
};

export default changeMonth;
