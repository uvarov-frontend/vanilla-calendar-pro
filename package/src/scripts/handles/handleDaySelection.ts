import { FormatDateString } from '@package/types';
import VanillaCalendar from '@src/vanilla-calendar';

const handleDaySelection = (self: VanillaCalendar, dayBtnEl: HTMLElement, multiple: boolean) => {
	if (!dayBtnEl.dataset.calendarDay) return;

	const selectedDay = dayBtnEl.dataset.calendarDay as FormatDateString;
	const isSelected = dayBtnEl.classList.contains(self.CSSClasses.dayBtnSelected);

	if (isSelected && !self.settings.selection.cancelableDay) return;

	let canToggle = true;
	if (self.toggleSelected !== undefined) {
		canToggle = (typeof self.toggleSelected === 'function')
			? self.toggleSelected(self)
			: self.toggleSelected;
	}

	if (isSelected && !canToggle) return;

	self.selectedDates = isSelected
		? self.selectedDates.filter((date) => date !== selectedDay)
		: multiple
			? [...self.selectedDates, selectedDay]
			: [selectedDay];
};

export default handleDaySelection;
