import { FormatDateString } from '@src/types';
import VanillaCalendar from '@scripts/vanilla-calendar';
import generateDate from '@scripts/helpers/generateDate';
import getDate from '@scripts/helpers/getDate';
import create from '@scripts/create';

let currentSelf: null | VanillaCalendar = null;

const removeHoverEffect = () => {
	const dayEls = currentSelf?.HTMLElement?.querySelectorAll(`.${currentSelf.CSSClasses.dayBtnHover}`);
	dayEls?.forEach((d) => d.classList.remove((currentSelf as VanillaCalendar).CSSClasses.dayBtnHover));
};

const addHoverEffect = (day: Date) => {
	if (!currentSelf?.selectedDates) return;
	const formattedDate = generateDate(day);

	if (currentSelf.rangeDisabled?.includes(formattedDate)) return;

	const dayEls: NodeListOf<HTMLElement> | undefined = currentSelf.HTMLElement?.querySelectorAll(`[data-calendar-day="${formattedDate}"]`);
	dayEls?.forEach((d) => d.classList.add((currentSelf as VanillaCalendar).CSSClasses.dayBtnHover));
};

const handleHoverDaysEvent = (e: MouseEvent) => {
	if (!e.target || !currentSelf?.selectedDates) return;
	removeHoverEffect();

	const dayEl: HTMLElement | null = (e.target as HTMLElement).closest('[data-calendar-day]');
	if (!dayEl) return;

	const formattedDate = dayEl.dataset.calendarDay as FormatDateString;
	const startDate = getDate(currentSelf.selectedDates[0]);
	const endDate = getDate(formattedDate);
	const [start, end] = startDate < endDate ? [startDate, endDate] : [endDate, startDate];

	for (let i = new Date(start); i <= end; i.setDate(i.getDate() + 1)) {
		addHoverEffect(i);
	}
};

const handleCancelSelectionDays = (e: KeyboardEvent) => {
	if (!currentSelf || e.key !== 'Escape') return;
	currentSelf.selectedDates = [];
	(currentSelf.HTMLElement).removeEventListener('mousemove', handleHoverDaysEvent);
	document.removeEventListener('keydown', handleCancelSelectionDays);
	create(currentSelf);
};

const updateDisabledDates = () => {
	if (!currentSelf?.selectedDates?.[0] || !currentSelf.rangeDisabled || currentSelf.rangeDisabled?.length < 2) return;
	const selectedDate = getDate(currentSelf.selectedDates[0]);

	const [startDate, endDate] = currentSelf.rangeDisabled
		.map((dateStr) => getDate(dateStr))
		.reduce<[Date | null, Date | null]>(([start, end], disabledDate) => [
		selectedDate >= disabledDate ? disabledDate : start,
		selectedDate < disabledDate && end === null ? disabledDate : end,
	], [null, null]);

	if (startDate) currentSelf.rangeMin = generateDate(new Date(startDate.setDate(startDate.getDate() + 1)));
	if (endDate) currentSelf.rangeMax = generateDate(new Date(endDate.setDate(endDate.getDate() - 1)));
};

const resetDisabledDates = () => {
	if (!currentSelf) return;
	const minDate = getDate(currentSelf.settings.range.min);
	currentSelf.rangeMin = currentSelf.settings.range.disablePast && minDate < currentSelf.date.today
		? generateDate(currentSelf.date.today)
		: currentSelf.settings.range.min;
	currentSelf.rangeMax = currentSelf.settings.range.max;
};

const handleDayRangedSelection = (self: VanillaCalendar, dayBtnEl: HTMLElement) => {
	const formattedDate = dayBtnEl.dataset.calendarDay as FormatDateString;
	const selectedDateExists = self.selectedDates.length === 1 && self.selectedDates[0].includes(formattedDate);
	self.selectedDates = selectedDateExists ? [] : self.selectedDates.length > 1 ? [formattedDate] : [...self.selectedDates, formattedDate];
	currentSelf = self;

	const selectionHandlers = {
		set: () => {
			self.HTMLElement.addEventListener('mousemove', handleHoverDaysEvent);
			document.addEventListener('keydown', handleCancelSelectionDays);
			if (self.settings.range.disableGaps) updateDisabledDates();
		},
		reset: () => {
			const [startDate, endDate] = (self.selectedDates as FormatDateString[]).map((selectedDate) => getDate(selectedDate));
			const dateIncrement = endDate > startDate ? 1 : -1;
			self.selectedDates = [];

			for (let i = new Date(startDate); endDate > startDate ? i <= endDate : i >= endDate; i.setDate(i.getDate() + dateIncrement)) {
				const date = generateDate(i);
				if (!self.rangeDisabled?.includes(date)) self.selectedDates = self.selectedDates ? [...self.selectedDates, date] : [date];
			}

			self.HTMLElement.removeEventListener('mousemove', handleHoverDaysEvent);
			document.removeEventListener('keydown', handleCancelSelectionDays);
			if (self.settings.range.disableGaps) resetDisabledDates();
		},
	};
	selectionHandlers[self.selectedDates.length === 1 ? 'set' : 'reset']();
};

export default handleDayRangedSelection;
