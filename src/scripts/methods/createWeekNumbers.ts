import { IVanillaCalendar } from 'src/types';
import getWeekNumber from './getWeekNumber';

const createWeekNumbers = (self: IVanillaCalendar, firstDayWeek: number, daysSelectedMonth: number, weekNumbersEl: HTMLElement, daysEl: HTMLElement) => {
	if (!self.settings.visibility.weekNumbers) return;
	const daysBtnEl = daysEl.querySelectorAll(`.${self.CSSClasses.dayBtn}`) as NodeListOf<HTMLElement>;

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
		const weekNumber = getWeekNumber(daysBtnEl[i * 7].dataset.calendarDay, self.settings.iso8601);
		if (!weekNumber) return;

		const weekNumberEl = templateWeekNumberEl.cloneNode(true) as HTMLElement;
		weekNumberEl.innerText = `${weekNumber.week}`;
		weekNumberEl.dataset.calendarYearWeek = `${weekNumber.year}`;
		weekNumbersContentEl.append(weekNumberEl);
	}
};

export default createWeekNumbers;
