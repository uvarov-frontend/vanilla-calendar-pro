import { IPopup } from '@package/types';
import VanillaCalendar from '@src/vanilla-calendar';

const handleDay = (date: string, dayInfo: IPopup, daysEl: HTMLElement, CSSClasses: string) => {
	const dayBtnEl: HTMLElement | null = daysEl.querySelector(`[data-calendar-day="${date}"]`);
	if (!dayBtnEl) return;
	if (dayInfo?.modifier) dayBtnEl.classList.add(...dayInfo.modifier.trim().split(' '));
	if (dayInfo?.html) (dayBtnEl.parentElement as HTMLElement).innerHTML += `<div class="${CSSClasses}">${dayInfo.html}</div>`;
};

const createPopup = (self: VanillaCalendar, daysEl: HTMLElement) => {
	if (!self.popups) return;
	Object.entries(self.popups)?.forEach(([date, dayInfo]) => handleDay(date, dayInfo, daysEl, self.CSSClasses.dayPopup));
};

export default createPopup;
