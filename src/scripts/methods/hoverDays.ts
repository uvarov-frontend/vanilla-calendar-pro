import { IVanillaCalendar } from 'src/types';
import generateDate from './generateDate';

let currentSelf: null | IVanillaCalendar = null;

const removeHover = () => {
	if (!currentSelf) return;
	const daysEl = currentSelf.HTMLElement?.querySelectorAll(`.${currentSelf.CSSClasses.dayBtnHover}`);
	if (daysEl) daysEl.forEach((d) => d.classList.remove((currentSelf as IVanillaCalendar).CSSClasses.dayBtnHover));
};

const addHover = (day: Date) => {
	if (!currentSelf || !currentSelf.selectedDates) return;
	const date = generateDate(day);

	if (currentSelf.settings.range.disabled && currentSelf.settings.range.disabled.includes(date)) return;
	const dayEl = currentSelf.HTMLElement?.querySelector(`[data-calendar-day="${date}"]`);
	dayEl?.classList.add(currentSelf.CSSClasses.dayBtnHover);
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

const hoverDays = (self: IVanillaCalendar) => {
	if (!self || !self.selectedDates) return;
	currentSelf = self;

	if (self.selectedDates.length <= 1) {
		(self.HTMLElement as HTMLElement).addEventListener('mousemove', hoverDaysEvent);
	} else {
		(self.HTMLElement as HTMLElement).removeEventListener('mousemove', hoverDaysEvent);
	}
};

export default hoverDays;
