import { IPopup } from '@package/types';
import VanillaCalendar from '@src/vanilla-calendar';
import { getAvailablePosition } from '@scripts/helpers/position';

const handleDay = (self: VanillaCalendar, date: string, dayInfo: IPopup, daysEl: HTMLElement) => {
	const CSSClasses = self.CSSClasses.dayPopup;
	const dayBtnEl: HTMLElement | null = daysEl.querySelector(`[data-calendar-day="${date}"]`);
	if (!dayBtnEl) return;
	if (dayInfo?.modifier) dayBtnEl.classList.add(...dayInfo.modifier.trim().split(' '));
	if (dayInfo?.html) {
		const dayEl = dayBtnEl.parentElement as HTMLElement;
		const dayPopup = document.createElement('div');
		dayPopup.className = CSSClasses;
		dayPopup.innerHTML = self.sanitizer(dayInfo.html);
		dayEl.appendChild(dayPopup);

		// wait for the element to be rendered in DOM before calculating its position
		setTimeout(() => {
			if (dayPopup) {
				const { canShow } = getAvailablePosition(dayEl, dayPopup);
				const extraTopPadding = 5;
				let top = dayEl.offsetHeight;
				let left = 0;
				if (!canShow.bottom) {
					top = -dayPopup.offsetHeight - extraTopPadding;
				}
				if (canShow.left && !canShow.right) {
					left = dayEl.offsetWidth - (dayPopup.offsetWidth / 2);
				}
				if (!canShow.left && canShow.right) {
					left = dayPopup.offsetWidth / 2;
				}

				Object.assign(dayPopup.style, { left: `${left}px`, top: `${top}px` });
			}
		});
	}
};

const createPopup = (self: VanillaCalendar, daysEl: HTMLElement) => {
	if (!self.popups) return;
	Object.entries(self.popups)?.forEach(([date, dayInfo]) => handleDay(self, date, dayInfo, daysEl));
};

export default createPopup;
