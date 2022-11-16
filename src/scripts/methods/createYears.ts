import { IVanillaCalendar } from 'src/types';
import controlArrows from './controlArrows';
import createDOM from './createDOM';
import showMonth from './showMonth';
import showYear from './showYear';

const createYears = (self: IVanillaCalendar) => {
	if (self.viewYear === undefined || !self.dateMin || !self.dateMax) return;
	self.currentType = 'year';
	createDOM(self);
	showMonth(self);
	showYear(self);
	controlArrows(self);

	const yearsEl = (self.HTMLElement as HTMLElement).querySelector(`.${self.CSSClasses.years}`);
	if (!yearsEl) return;
	if (self.settings.selection.year) (yearsEl as HTMLElement).classList.add(self.CSSClasses.yearsSelecting);
	const templateYearEl = document.createElement('button');
	templateYearEl.type = 'button';
	templateYearEl.className = self.CSSClasses.yearsYear;

	for (let i = self.viewYear - 7; i < self.viewYear + 8; i++) {
		const year = i;
		const yearEl = templateYearEl.cloneNode(true) as HTMLButtonElement;

		if (year === self.selectedYear) {
			yearEl.classList.add(self.CSSClasses.yearsYearSelected);
		}
		if (year < self.dateMin.getUTCFullYear()) {
			yearEl.classList.add(self.CSSClasses.yearsYearDisabled);
			yearEl.tabIndex = -1;
		}
		if (year > self.dateMax.getUTCFullYear()) {
			yearEl.classList.add(self.CSSClasses.yearsYearDisabled);
			yearEl.tabIndex = -1;
		}

		yearEl.dataset.calendarYear = String(year);
		yearEl.innerText = `${year}`;
		yearsEl.append(yearEl);
	}
};

export default createYears;
