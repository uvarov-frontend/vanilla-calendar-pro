import { IVanillaCalendar } from '@src/types';
import generateDate from '@scripts/helpers/generateDate';

import visibilityArrows from '@scripts/methods/visibilityArrows';
import createDays from '@scripts/methods/createDays';
import visibilityMonth from '@scripts/methods/visibilityMonth';
import visibilityYear from '@scripts/methods/visibilityYear';

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

	visibilityMonth(self);
	visibilityYear(self);
	visibilityArrows(self);
	createDays(self);
};

export default changeMonth;
