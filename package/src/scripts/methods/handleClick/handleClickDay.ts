import { FormatDateString, IVanillaCalendar } from '../../../types';
import calendarInput from '../../helpers/calendarInput';
import changeMonth from '../changeMonth';
import createDays from '../createDays';
// import generateDate from '../helpers/generateDate';
// import handlerMultipleRanged from './handlerMultipleRanged';

const handleClickDay = (self: IVanillaCalendar, event: MouseEvent) => {
	const element = event.target as HTMLElement;
	const closest = (className: string): HTMLElement | null => element.closest(`.${className}`);
	const dayBtnEl: HTMLElement | null = closest(self.CSSClasses.dayBtn);

	if (!self.settings.selection.day || !['single', 'multiple', 'multiple-ranged'].includes(self.settings.selection.day) || !dayBtnEl) return;

	const handleSelectedDates = (multiple: boolean) => {
		if (!self.selectedDates || !dayBtnEl || !dayBtnEl.dataset.calendarDay) return;
		const selectedDay = dayBtnEl.dataset.calendarDay as FormatDateString;
		const isSelected = dayBtnEl.classList.contains(self.CSSClasses.dayBtnSelected);

		self.selectedDates = isSelected ? self.selectedDates.filter((date) => date !== selectedDay)
			: multiple ? [...self.selectedDates, selectedDay] : [selectedDay];
	};

	// const clickDayMultipleRanged = () => {
	// 	if (!self.selectedDates || !dayBtnEl || !dayBtnEl.dataset.calendarDay) return;

	// 	if (self.selectedDates.length <= 1 && self.selectedDates[0] && self.selectedDates[0].includes(dayBtnEl.dataset.calendarDay)) {
	// 		self.selectedDates = [];
	// 	} else {
	// 		if (self.selectedDates.length > 1) self.selectedDates = [];
	// 		self.selectedDates.push(dayBtnEl.dataset.calendarDay as FormatDateString);
	// 	}

	// 	if (self.selectedDates[1]) {
	// 		const startDate = new Date(
	// 			new Date(`${self.selectedDates[0]}T00:00:00`).getFullYear(),
	// 			new Date(`${self.selectedDates[0]}T00:00:00`).getMonth(),
	// 			new Date(`${self.selectedDates[0]}T00:00:00`).getDate(),
	// 		);

	// 		const endDate = new Date(
	// 			new Date(`${self.selectedDates[1]}T00:00:00`).getFullYear(),
	// 			new Date(`${self.selectedDates[1]}T00:00:00`).getMonth(),
	// 			new Date(`${self.selectedDates[1]}T00:00:00`).getDate(),
	// 		);

	// 		const addSelectedDate = (day: Date) => {
	// 			if (!self.selectedDates) return;
	// 			const date = generateDate(day);
	// 			if (self.rangeDisabled && self.rangeDisabled.includes(date)) return;
	// 			self.selectedDates.push(date);
	// 		};

	// 		self.selectedDates = [];

	// 		if (endDate > startDate) {
	// 			for (let i = startDate; i <= endDate; i.setDate(i.getDate() + 1)) {
	// 				addSelectedDate(i);
	// 			}
	// 		} else {
	// 			for (let i = startDate; i >= endDate; i.setDate(i.getDate() - 1)) {
	// 				addSelectedDate(i);
	// 			}
	// 		}
	// 	}

	// 	handlerMultipleRanged(self);
	// };

	const daySelectionActions = {
		single: () => handleSelectedDates(false),
		multiple: () => handleSelectedDates(true),
		'multiple-ranged': () => false,
		// 'multiple-ranged': () => clickDayMultipleRanged(),
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
