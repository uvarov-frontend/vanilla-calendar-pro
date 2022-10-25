import { IVanillaCalendar } from 'src/types';
import getWeekNumber from './getWeekNumber';

const createWeekNumbers = (self: IVanillaCalendar, firstDayWeek: number, daysSelectedMonth: number) => {
	if (!self.settings.visibility.weekNumbers) return;
	const weekNumbersEl = (self.HTMLElement as HTMLElement).querySelector('.vanilla-calendar-week-numbers');
	const daysBtnEl: NodeListOf<HTMLElement> = (self.HTMLElement as HTMLElement).querySelectorAll('.vanilla-calendar-day__btn');

	if (weekNumbersEl instanceof HTMLElement) {
		const countWeek = Math.ceil((firstDayWeek + daysSelectedMonth) / 7);
		const templateWeekNumberEl = document.createElement('span');
		templateWeekNumberEl.className = 'vanilla-calendar-week-number';

		weekNumbersEl.innerHTML = '';

		for (let i = 0; i < countWeek; i++) {
			const weekNumber = getWeekNumber(daysBtnEl[i * 7].dataset.calendarDay);
			if (!weekNumber) return;

			const weekNumberEl = templateWeekNumberEl.cloneNode(true);
			if (weekNumberEl instanceof HTMLElement) {
				weekNumberEl.innerText = `${weekNumber.week}`;
				weekNumberEl.dataset.calendarYearWeek = `${weekNumber.year}`;
				weekNumbersEl.append(weekNumberEl);
			}
		}
	}
};

export default createWeekNumbers;
