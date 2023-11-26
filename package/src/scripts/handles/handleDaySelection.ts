import { FormatDateString, IVanillaCalendar } from '@src/types';

const handleDaySelection = (self: IVanillaCalendar, dayBtnEl: HTMLElement, multiple: boolean) => {
	if (!dayBtnEl.dataset.calendarDay) return;

	const selectedDay = dayBtnEl.dataset.calendarDay as FormatDateString;
	const isSelected = dayBtnEl.classList.contains(self.CSSClasses.dayBtnSelected);

	self.selectedDates = isSelected ? self.selectedDates.filter((date) => date !== selectedDay)
		: multiple ? [...self.selectedDates, selectedDay] : [selectedDay];
};

export default handleDaySelection;
