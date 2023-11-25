import { IVanillaCalendar } from '@src/types';
import create from '@scripts/create';
import setVariables from '@scripts/helpers/setVariables';

const update = (self: IVanillaCalendar) => {
	let tempSelectedDates = null;
	let tempSelectedMonth = null;
	let tempSelectedYear = null;

	if (!self.settings.selected.dates?.[0]) {
		tempSelectedDates = self.settings.selected.dates;
		self.settings.selected.dates = self.selectedDates;
	}
	if (!self.settings.selected.month) {
		tempSelectedMonth = self.settings.selected.month;
		self.settings.selected.month = self.selectedMonth as number;
	}
	if (!self.settings.selected.year) {
		tempSelectedYear = self.settings.selected.year;
		self.settings.selected.year = self.selectedYear as number;
	}
	setVariables(self);
	create(self);
	self.settings.selected.dates = tempSelectedDates;
	self.settings.selected.month = tempSelectedMonth;
	self.settings.selected.year = tempSelectedYear;
};

export default update;
