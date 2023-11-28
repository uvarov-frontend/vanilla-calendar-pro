import VanillaCalendar from '@src/vanilla-calendar';
import setVariables from '@scripts/helpers/setVariables';
import create from '@scripts/create';

const update = (self: VanillaCalendar) => {
	const { dates, month, year } = self.settings.selected;

	self.settings.selected.dates = !dates?.[0] ? self.selectedDates : dates;
	self.settings.selected.month = !month ? self.selectedMonth : month;
	self.settings.selected.year = !year ? self.selectedYear : year;

	setVariables(self);
	create(self);

	self.settings.selected = { dates, month, year };
};

export default update;
