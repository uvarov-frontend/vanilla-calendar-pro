import { IReset } from '@package/types';
import VanillaCalendar from '@src/vanilla-calendar';
import setVariables from '@scripts/helpers/setVariables';
import create from '@scripts/create';
import handleDayRangedSelection from '@scripts/handles/handleDayRangedSelection';

const reset = (self: VanillaCalendar, {
	year,
	month,
	dates,
	holidays,
	time,
}: IReset = {}) => {
	const previousSelected = { ...self.settings.selected };

	self.settings.selected.year = year ? previousSelected.year : self.selectedYear;
	self.settings.selected.month = month ? previousSelected.month : self.selectedMonth;
	self.settings.selected.holidays = holidays ? previousSelected.holidays : self.selectedHolidays;
	self.settings.selected.time = time ? previousSelected.time : self.selectedTime;

	self.settings.selected.dates = dates === 'only-first' && self.selectedDates?.[0]
		? [self.selectedDates[0]]
		: dates === true
			? previousSelected.dates
			: self.selectedDates;

	setVariables(self);
	create(self);

	self.settings.selected = previousSelected;
	if (self.settings.selection.day === 'multiple-ranged' && dates) handleDayRangedSelection(self);
};

export default reset;
