import VanillaCalendar from '@src/vanilla-calendar';
import messages from '@scripts/helpers/getMessages';
import setVariables from '@scripts/helpers/setVariables';
import create from '@scripts/create';

const update = (self: VanillaCalendar) => {
	if (!self.isInit) throw new Error(messages.notInit);

	const { dates, month, year } = self.settings.selected;

	self.settings.selected.dates = !dates?.[0] ? self.selectedDates : dates;
	self.settings.selected.month = !month ? self.selectedMonth : month;
	self.settings.selected.year = !year ? self.selectedYear : year;

	setVariables(self);
	create(self);

	self.settings.selected = { dates, month, year };
};

export default update;
