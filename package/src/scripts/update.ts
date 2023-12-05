import VanillaCalendar from '@src/vanilla-calendar';
import messages from '@scripts/helpers/getMessages';
import setVariables from '@scripts/helpers/setVariables';
import create from '@scripts/create';

const update = (self: VanillaCalendar, reset?: {
	year?: boolean;
	month?: boolean;
	dates?: boolean;
	holidays?: boolean;
	time?: boolean;
}) => {
	if (!self.isInit) throw new Error(messages.notInit);

	const previousSelected = { ...self.settings.selected };

	self.settings.selected.year = reset?.year && previousSelected.year ? previousSelected.year : self.selectedYear;
	self.settings.selected.month = reset?.month && (previousSelected.month || previousSelected.month === 0) ? previousSelected.month : self.selectedMonth;
	self.settings.selected.dates = reset?.dates && previousSelected.dates ? previousSelected.dates : self.selectedDates;
	self.settings.selected.holidays = reset?.holidays && previousSelected.holidays ? previousSelected.holidays : self.selectedHolidays;
	self.settings.selected.time = reset?.time && previousSelected.time ? previousSelected.time : self.selectedTime;

	setVariables(self);
	create(self);

	self.settings.selected = previousSelected;
};

export default update;
