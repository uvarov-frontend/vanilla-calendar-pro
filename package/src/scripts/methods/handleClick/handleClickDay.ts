import { FormatDateString, IVanillaCalendar } from '../../../types';
import calendarInput from '../../helpers/calendarInput';
import changeMonth from '../changeMonth';
import createDays from '../createDays';
import handleDayRangedSelection from './handleDayRangedSelection';

const handleClickDay = (self: IVanillaCalendar, event: MouseEvent) => {
	const element = event.target as HTMLElement;
	const closest = (className: string): HTMLElement | null => element.closest(`.${className}`);
	const dayBtnEl: HTMLElement | null = closest(self.CSSClasses.dayBtn);

	if (!self.settings.selection.day || !['single', 'multiple', 'multiple-ranged'].includes(self.settings.selection.day) || !dayBtnEl) return;

	const handleDaySelection = (multiple: boolean) => {
		if (!self.selectedDates || !dayBtnEl || !dayBtnEl.dataset.calendarDay) return;
		const selectedDay = dayBtnEl.dataset.calendarDay as FormatDateString;
		const isSelected = dayBtnEl.classList.contains(self.CSSClasses.dayBtnSelected);

		self.selectedDates = isSelected ? self.selectedDates.filter((date) => date !== selectedDay)
			: multiple ? [...self.selectedDates, selectedDay] : [selectedDay];
	};

	const daySelectionActions = {
		single: () => handleDaySelection(false),
		multiple: () => handleDaySelection(true),
		'multiple-ranged': () => handleDayRangedSelection(self, dayBtnEl),
	};
	daySelectionActions[self.settings.selection.day]();

	if (self.actions.clickDay) self.actions.clickDay(event, self.selectedDates);

	const isInitAsInput = self.input && self.HTMLInputElement && self.HTMLElement;
	if (isInitAsInput && self.actions.changeToInput) {
		self.actions.changeToInput(
			event,
			calendarInput(self),
			self.selectedDates,
			self.selectedTime,
			self.selectedHours,
			self.selectedMinutes,
			self.selectedKeeping,
		);
	}

	const dayBtnPrevEl = closest(self.CSSClasses.dayBtnPrev);
	const dayBtnNextEl = closest(self.CSSClasses.dayBtnNext);

	const actionMapping = {
		prev: () => changeMonth(self, 'prev'),
		next: () => changeMonth(self, 'next'),
		default: () => createDays(self),
	};

	actionMapping[dayBtnPrevEl ? 'prev' : dayBtnNextEl ? 'next' : 'default']();
};

export default handleClickDay;
