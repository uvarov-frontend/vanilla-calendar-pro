import { IVanillaCalendar } from '../../types';
import getWeekNumber from './getWeekNumber';

const createWeekNumbers = (self: IVanillaCalendar, firstDayWeek: number, daysSelectedMonth: number, weekNumbersEl: HTMLElement, daysEl: HTMLElement) => {
	if (!self.settings.visibility.weekNumbers) return;
	const dayEls = daysEl.querySelectorAll(`.${self.CSSClasses.day}`) as NodeListOf<HTMLElement>;

	weekNumbersEl.innerHTML = '';
	const countWeek = Math.ceil((firstDayWeek + daysSelectedMonth) / 7);

	const weekNumbersTitleEl = document.createElement('b');
	weekNumbersTitleEl.className = self.CSSClasses.weekNumbersTitle;
	weekNumbersTitleEl.innerText = '#';
	weekNumbersEl.append(weekNumbersTitleEl);

	const weekNumbersContentEl = document.createElement('div');
	weekNumbersContentEl.className = self.CSSClasses.weekNumbersContent;
	weekNumbersEl.append(weekNumbersContentEl);

	const templateWeekNumberEl = document.createElement('span');
	templateWeekNumberEl.className = self.CSSClasses.weekNumber;

	for (let i = 0; i < countWeek; i++) {
		let dayBtnEl: HTMLElement | null = null;

		if (i === 0) {
			dayBtnEl = dayEls[6].querySelector(`.${self.CSSClasses.dayBtn}`) as HTMLElement;
		} else {
			dayBtnEl = dayEls[i * 7].querySelector(`.${self.CSSClasses.dayBtn}`) as HTMLElement;
		}

		const weekNumber = getWeekNumber(dayBtnEl.dataset.calendarDay, self.settings.iso8601);
		if (!weekNumber) return;

		const weekNumberEl = templateWeekNumberEl.cloneNode(true) as HTMLElement;
		weekNumberEl.innerText = `${weekNumber.week}`;
		weekNumberEl.dataset.calendarYearWeek = `${weekNumber.year}`;
		weekNumbersContentEl.append(weekNumberEl);
	}
};

export default createWeekNumbers;
