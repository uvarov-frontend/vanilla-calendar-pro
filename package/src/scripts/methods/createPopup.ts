import { FormatDateString, IVanillaCalendar } from 'src/types';

const createPopup = (self: IVanillaCalendar, daysEl: HTMLElement) => {
	if (!self.popups) return;

	Object.keys(self.popups).forEach((date: string) => {
		const dayBtnEl = daysEl.querySelector(`[data-calendar-day="${date}"]`);

		if (dayBtnEl) {
			const dayInfo = self.popups?.[date as FormatDateString];
			if (dayInfo?.modifier) dayInfo.modifier.trim().split(' ').forEach((cl) => { dayBtnEl.classList.add(cl); });
			if (dayInfo?.html) (dayBtnEl.parentNode as HTMLElement).innerHTML += `<div class="${self.CSSClasses.dayPopup}">${dayInfo.html}</div>`;
		}
	});
};

export default createPopup;
