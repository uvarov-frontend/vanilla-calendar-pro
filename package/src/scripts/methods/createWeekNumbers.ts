import { FormatDateString } from '@package/types';
import VanillaCalendar from '@src/vanilla-calendar';
import getWeekNumber from '@scripts/helpers/getWeekNumber';

const createWeekNumber = (
	self: VanillaCalendar,
	dayEls: NodeListOf<HTMLElement>,
	index: number,
	templateWeekNumberEl: HTMLButtonElement,
	weekNumbersContentEl: HTMLDivElement,
) => {
	const dayBtnEl: HTMLElement | null = dayEls[index].querySelector(`.${self.CSSClasses.dayBtn}`);
	const weekNumber = getWeekNumber(dayBtnEl?.dataset.calendarDay as FormatDateString | undefined, self.settings.iso8601);

	if (!weekNumber) return;

	const weekNumberEl = templateWeekNumberEl.cloneNode(true) as HTMLElement;
	weekNumberEl.innerText = String(weekNumber.week);
	weekNumberEl.dataset.calendarYearWeek = String(weekNumber.year);
	weekNumbersContentEl.append(weekNumberEl);
};

const createWeekNumbers = (self: VanillaCalendar, firstDayWeek: number, daysSelectedMonth: number, weekNumbersEl: HTMLElement, daysEl: HTMLElement) => {
	if (!self.settings.visibility.weekNumbers) return;
	weekNumbersEl.textContent = '';

	const weekNumbersTitleEl = document.createElement('b');
	weekNumbersTitleEl.className = self.CSSClasses.weekNumbersTitle;
	weekNumbersTitleEl.innerText = '#';
	weekNumbersEl.append(weekNumbersTitleEl);

	const weekNumbersContentEl = document.createElement('div');
	weekNumbersContentEl.className = self.CSSClasses.weekNumbersContent;
	weekNumbersEl.append(weekNumbersContentEl);

	const templateWeekNumberEl = document.createElement('button');
	templateWeekNumberEl.type = 'button';
	templateWeekNumberEl.className = self.CSSClasses.weekNumber;

	const dayEls: NodeListOf<HTMLElement> = daysEl.querySelectorAll(`.${self.CSSClasses.day}`);
	const weeksCount = Math.ceil((firstDayWeek + daysSelectedMonth) / 7);

	for (let i = 0; i < weeksCount; i++) {
		createWeekNumber(self, dayEls, i === 0 ? 6 : i * 7, templateWeekNumberEl, weekNumbersContentEl);
	}
};

export default createWeekNumbers;
