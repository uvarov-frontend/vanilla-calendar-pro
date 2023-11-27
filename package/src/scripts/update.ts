import VanillaCalendar from '@src/vanilla-calendar';
import setVariables from '@scripts/helpers/setVariables';
import create from '@scripts/create';

const update = (self: VanillaCalendar) => {
	const { dates, month, year } = self.settings.selected;

	self.settings.selected.dates = self.selectedDates;
	self.settings.selected.month = self.selectedMonth;
	self.settings.selected.year = self.selectedYear;

	setVariables(self);
	create(self);

	self.settings.selected = { dates, month, year };
};

export default update;
