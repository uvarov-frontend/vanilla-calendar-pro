import VanillaCalendar from '@src/vanilla-calendar';
import { FormatDateString } from '@package/types';
import changeMonth from '@scripts/methods/changeMonth';
import createDays from '@scripts/methods/createDays';
import handleDayRangedSelection from '@scripts/handles/handleDayRangedSelection';
import handleDaySelection from '@scripts/handles/handleDaySelection';

const handleClickDay = (self: VanillaCalendar, event: MouseEvent) => {
	const element = event.target as HTMLElement;
	const dayBtnEl: HTMLElement | null = element.closest('[data-calendar-day-btn]');

	if (!self.settings.selection.day || !['single', 'multiple', 'multiple-ranged'].includes(self.settings.selection.day) || !dayBtnEl) return;

	const daySelectionActions = {
		single: () => handleDaySelection(self, dayBtnEl, false),
		multiple: () => handleDaySelection(self, dayBtnEl, true),
		'multiple-ranged': () => handleDayRangedSelection(self, dayBtnEl.dataset.calendarDay as FormatDateString),
	};
	daySelectionActions[self.settings.selection.day]();
	self.selectedDates?.sort((a, b) => +new Date(a) - +new Date(b));

	if (self.actions.clickDay) self.actions.clickDay(event, self);

	const isInitAsInput = self.input && self.HTMLInputElement && self.HTMLElement;
	if (isInitAsInput && self.actions.changeToInput) {
		self.actions.changeToInput(
			event,
			self,
		);
	}

	const dayBtnPrevEl = element.closest('[data-calendar-day-btn="prev"]');
	const dayBtnNextEl = element.closest('[data-calendar-day-btn="next"]');

	const actionMapping = {
		prev: () => changeMonth(self, 'prev'),
		next: () => changeMonth(self, 'next'),
		default: () => createDays(self),
	};

	actionMapping[dayBtnPrevEl ? 'prev' : dayBtnNextEl ? 'next' : 'default']();
};

export default handleClickDay;
