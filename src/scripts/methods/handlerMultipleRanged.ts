import { IVanillaCalendar } from 'src/types';
import generateDate from '../helpers/generateDate';
import update from './updateCalendar';

let currentSelf: null | IVanillaCalendar = null;

const removeHover = () => {
	if (!currentSelf) return;
	const daysEl = currentSelf.HTMLElement?.querySelectorAll(`.${currentSelf.CSSClasses.dayBtnHover}`);
	if (daysEl) daysEl.forEach((d) => d.classList.remove((currentSelf as IVanillaCalendar).CSSClasses.dayBtnHover));
};

const addHover = (day: Date) => {
	if (!currentSelf || !currentSelf.selectedDates) return;
	const date = generateDate(day);

	if (currentSelf.rangeDisabled && currentSelf.rangeDisabled.includes(date)) return;
	const dayEls = currentSelf.HTMLElement?.querySelectorAll(`[data-calendar-day="${date}"]`) as NodeListOf<HTMLElement>;

	dayEls?.forEach((dayEl) => {
		dayEl.classList.add((currentSelf as IVanillaCalendar).CSSClasses.dayBtnHover);
	});
};

const hoverDaysEvent = (e: MouseEvent) => {
	if (!e.target || !currentSelf || !currentSelf.selectedDates) return;

	if (!(e.target as HTMLElement).closest(`.${currentSelf.CSSClasses.days}`)) {
		removeHover();
		return;
	}

	const date = (e.target as HTMLElement).dataset.calendarDay;
	if (!date) return;
	removeHover();

	const startDate = new Date(Date.UTC(
		new Date(currentSelf.selectedDates[0]).getUTCFullYear(),
		new Date(currentSelf.selectedDates[0]).getUTCMonth(),
		new Date(currentSelf.selectedDates[0]).getUTCDate(),
	));

	const endDate = new Date(Date.UTC(
		new Date(date).getUTCFullYear(),
		new Date(date).getUTCMonth(),
		new Date(date).getUTCDate(),
	));

	if (endDate > startDate) {
		for (let i = startDate; i <= endDate; i.setUTCDate(i.getUTCDate() + 1)) {
			addHover(i);
		}
	} else {
		for (let i = startDate; i >= endDate; i.setUTCDate(i.getUTCDate() - 1)) {
			addHover(i);
		}
	}
};

const cancelSelectionDays = (e: KeyboardEvent) => {
	if (!currentSelf || e.key !== 'Escape') return;

	currentSelf.selectedDates = [];
	(currentSelf.HTMLElement as HTMLElement).removeEventListener('mousemove', hoverDaysEvent);
	document.removeEventListener('keydown', cancelSelectionDays);
	update(currentSelf);
};

const setDisabledDates = () => {
	if (!currentSelf || !currentSelf.selectedDates?.[0] || !currentSelf.rangeDisabled || currentSelf.rangeDisabled.length < 2) return;
	const selectedDate = new Date(currentSelf.selectedDates[0]);

	let startDate = null;
	let endDate = null;

	currentSelf.rangeDisabled.sort((a, b) => +new Date(a) - +new Date(b));

	for (let index = 0; index < currentSelf.rangeDisabled.length; index++) {
		const disabledDate = new Date(currentSelf.rangeDisabled[index]);
		if (selectedDate >= disabledDate) {
			startDate = disabledDate;
		} else {
			endDate = disabledDate;
			break;
		}
	}

	if (startDate) {
		startDate = new Date(startDate.setDate(startDate.getDate() + 1));
		currentSelf.rangeMin = generateDate(startDate);
	}

	if (endDate) {
		endDate = new Date(endDate.setDate(endDate.getDate() - 1));
		currentSelf.rangeMax = generateDate(endDate);
	}
};

const resetDisabledDates = () => {
	if (!currentSelf) return;
	currentSelf.rangeMin = currentSelf.settings.range.min;
	currentSelf.rangeMax = currentSelf.settings.range.max;

	if (currentSelf.settings.range.disablePast && new Date(currentSelf.settings.range.min) < currentSelf.date.today) {
		currentSelf.rangeMin = generateDate(currentSelf.date.today);
	}
};

const handlerMultipleRanged = (self: IVanillaCalendar) => {
	if (!self || !self.selectedDates) return;
	currentSelf = self;

	if (self.selectedDates[0] && self.selectedDates.length <= 1) {
		(self.HTMLElement as HTMLElement).addEventListener('mousemove', hoverDaysEvent);
		document.addEventListener('keydown', cancelSelectionDays);
		if (self.settings.range.disableGaps) setDisabledDates();
	} else {
		(self.HTMLElement as HTMLElement).removeEventListener('mousemove', hoverDaysEvent);
		document.removeEventListener('keydown', cancelSelectionDays);
		if (self.settings.range.disableGaps) resetDisabledDates();
	}
};

export default handlerMultipleRanged;
