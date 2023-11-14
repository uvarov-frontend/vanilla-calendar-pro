import { IVanillaCalendar } from '@src/types';
import calendarInput from '@helpers/calendarInput';

import changeMonth from '@methods/changeMonth';
import createDays from '@methods/createDays';
import handleDayRangedSelection from '@methods/handles/handleDayRangedSelection';
import handleDaySelection from '@methods/handles/handleDaySelection';

const handleClickDay = (self: IVanillaCalendar, event: MouseEvent) => {
	const element = event.target as HTMLElement;
	const closest = (className: string): HTMLElement | null => element.closest(`.${className}`);
	const dayBtnEl: HTMLElement | null = closest(self.CSSClasses.dayBtn);

	if (!self.settings.selection.day || !['single', 'multiple', 'multiple-ranged'].includes(self.settings.selection.day) || !dayBtnEl) return;

	const daySelectionActions = {
		single: () => handleDaySelection(self, dayBtnEl, false),
		multiple: () => handleDaySelection(self, dayBtnEl, false),
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
