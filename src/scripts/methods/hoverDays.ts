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

const checkDaysEvent = (e: MouseEvent) => {
	if (!e.target || !currentSelf) return;
	if (![...(e.target as HTMLElement).classList].includes(currentSelf.CSSClasses.dayBtn)
		&& ![...(e.target as HTMLElement).classList].includes(currentSelf.CSSClasses.day)
		&& ![...(e.target as HTMLElement).classList].includes(currentSelf.CSSClasses.days)) {
		removeHover();
	}
};

const hoverDays = (self: IVanillaCalendar) => {
	const days = self.HTMLElement?.querySelector(`.${self.CSSClasses.days}`);
	if (!self || !self.selectedDates || !days) return;
	currentSelf = self;

	if (self.selectedDates.length <= 1) {
		(days as HTMLElement).addEventListener('mouseover', hoverDaysEvent);
		(self.HTMLElement as HTMLElement).addEventListener('mouseout', checkDaysEvent);
	} else {
		(days as HTMLElement).removeEventListener('mouseover', hoverDaysEvent);
		(self.HTMLElement as HTMLElement).removeEventListener('mouseout', checkDaysEvent);
	}
};

export default hoverDays;
